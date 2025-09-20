import express from "express";

import { googleMiddleware } from "@middleware/google-auth";

import * as ctrl from "./transactions-ctrl";

export const routes = express.Router();

routes.get("/bucket", googleMiddleware, ctrl.listBucket);
routes.get("/bucket/:id", googleMiddleware, ctrl.getBucket);
routes.delete("/bucket/:id", googleMiddleware, ctrl.removeBucket);
routes.post("/bucket", googleMiddleware, ctrl.createBucket);
routes.put("/bucket", googleMiddleware, ctrl.updateBucket);

routes.get("/transaction-dashboard/:id", googleMiddleware, ctrl.dashboard);
routes.post("/transaction", googleMiddleware, ctrl.createTransaction);
routes.delete("/transaction", googleMiddleware, ctrl.removeAllTransaction);
