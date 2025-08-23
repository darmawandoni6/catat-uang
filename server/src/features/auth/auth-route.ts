import express from "express";

import { googleMiddleware } from "@middleware/google-auth";

import { callbackOauth, googleLogout, googleMe, requestOauth } from "./auth-ctrl";

export const routes = express.Router();

routes.get("/request", requestOauth);
routes.get("/oauth", callbackOauth);
routes.post("/google-me", googleMe);
routes.post("/google-logout", googleMiddleware, googleLogout);
