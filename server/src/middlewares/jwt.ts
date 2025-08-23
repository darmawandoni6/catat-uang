import type { NextFunction, Request, Response } from "express";

import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export const jwtAuthorized = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies["access-token"];

    if (!token && !token?.startsWith("Bearer ")) {
      next(createHttpError.Unauthorized());
      return;
    }

    token = token.replace("Bearer ", "");
    jwt.verify(token, process.env.ACCESS_TOKEN as string, (error: unknown, payload: unknown) => {
      if (error) {
        const err = error as Error;
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
