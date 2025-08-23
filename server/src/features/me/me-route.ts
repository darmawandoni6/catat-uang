import express from "express";

import { googleMiddleware } from "@middleware/google-auth";

import { me } from "./me-ctrl";

export const routes = express.Router();

routes.get("/me", googleMiddleware, me);
