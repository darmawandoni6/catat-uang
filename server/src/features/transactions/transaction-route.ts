import express from "express";

import { googleMiddleware } from "@middleware/google-auth";

import { createTransaction, dashboard, listTransaction, remove } from "./transactions-ctrl";

export const routes = express.Router();

routes.post("/transaction", googleMiddleware, createTransaction);
routes.get("/transaction", googleMiddleware, listTransaction);
routes.get("/transaction-dashboard", googleMiddleware, dashboard);
routes.delete("/transaction", googleMiddleware, remove);
