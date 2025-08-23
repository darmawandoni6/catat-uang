import type { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

import { getUserData } from "@feature/auth/auth-service";
import { oauth2Client } from "@util/google-oauth";
import { generateToken } from "@util/token";

export const googleMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let jwtToken: string = req.cookies["access-token"];
    let tokenAccess: string = req.cookies["google-access-token"];
    let tokenRefresh: string = req.cookies["google-refresh-token"];

    if (!tokenAccess || !tokenRefresh || !jwtToken || !jwtToken.startsWith("Bearer ")) {
      next(createHttpError.Unauthorized());
      return;
    }

    jwtToken = jwtToken.replace("Bearer ", "");
    jwt.verify(jwtToken, process.env.ACCESS_TOKEN as string, async (error: unknown, payload: unknown) => {
      if (error) {
        const err = error as Error;

        if (err.message === "TokenExpiredError") {
          oauth2Client.setCredentials({ refresh_token: tokenRefresh });
          const { credentials } = await oauth2Client.refreshAccessToken();
          const data = await getUserData(credentials);

          const token = generateToken({
            sub: data,
          });

          res.cookie("access-token", "Bearer " + token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
          });

          res.cookie("google-access-token", credentials.access_token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
          });
          res.cookie("google-refresh-token", credentials.refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
          });
        }

        const message = err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        next(createHttpError.Unauthorized(message));
        return;
      }

      res.locals = payload as typeof res.locals;
      next();
    });
  } catch (error) {
    next(error);
  }
};
