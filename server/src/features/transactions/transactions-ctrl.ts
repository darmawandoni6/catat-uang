import type { NextFunction, Request, Response } from "express";

import { Prisma } from "@prisma/client";
import { validateJoi } from "@util/joy-validate";

import { createPayload, dashboardParams, listPayload } from "./transaction-schema";
import { create, getGrafikTransactions, getStatic, list, removeAll } from "./transactions-service";
import { TransactionsParams } from "./types";

export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sub } = res.locals;
    const payload = validateJoi(createPayload, req.body as Prisma.TransactionsUncheckedCreateInput);
    payload.user_sub = sub;

    await create(payload);
    res.json({
      message: "success create",
    });
  } catch (error) {
    next(error);
  }
};

export const listTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sub } = res.locals;

    const payload = validateJoi(listPayload, req.query as TransactionsParams);
    payload.sub = sub;
    const { data, count } = await list(payload);

    res.json({
      data,
      count,
    });
  } catch (error) {
    next(error);
  }
};

export const dashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sub } = res.locals;
    const payload = validateJoi(dashboardParams, req.query as Pick<TransactionsParams, "sub" | "type">);
    payload.sub = sub;
    const [grafik, staticData] = await Promise.all([getGrafikTransactions(payload), getStatic(payload)]);

    res.json({ grafik, staticData });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sub } = res.locals;
    await removeAll(sub);
    res.json({ message: "success" });
  } catch (error) {
    next(error);
  }
};
