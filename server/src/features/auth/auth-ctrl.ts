import type { NextFunction, Request, Response } from "express";

import { oauth2Client } from "@util/google-oauth";
import { generateToken } from "@util/token";

import { getUserData, userLogout } from "./auth-service";

export const requestOauth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorize_url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["openid", "profile", "email"],
      prompt: "consent",
    });

    res.redirect(303, authorize_url);
  } catch (error) {
    next(error);
  }
};
export const callbackOauth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const code = req.query.code;

    // apa yang dilakukan
    res.redirect(303, `${process.env.URL_CLIENT}/login?code=${code}`);
  } catch (error) {
    next(error);
  }
};

// Step 3: Endpoint cek user
export const googleMe = async (req: Request, res: Response) => {
  const code = req.body.code;
  const { tokens } = await oauth2Client.getToken(String(code));
  oauth2Client.setCredentials(tokens);

  const data = await getUserData(tokens);

  const token = generateToken({
    sub: data,
  });
  const expires = new Date(); // Now
  expires.setDate(expires.getDate() + 30);

  res.cookie("access-token", "Bearer " + token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    expires,
  });

  res.cookie("google-access-token", tokens.access_token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    expires,
  });
  res.cookie("google-refresh-token", tokens.refresh_token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    expires,
  });

  res.json({ data });
};

export const googleLogout = async (req: Request, res: Response) => {
  const { sub } = res.locals;
  await userLogout(sub);

  res.clearCookie("access-token");
  res.clearCookie("google-access-token");
  res.clearCookie("google-refresh-token");

  res.json({ message: "success logout" });
};
