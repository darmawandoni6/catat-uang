import type { NextFunction, Request, Response } from "express";

import { Buckets, Prisma } from "@prisma/client";
import { validateJoi } from "@util/joy-validate";

import * as schema from "./transaction-schema";
import * as service from "./transactions-service";

export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sub } = res.locals;
    const payload = validateJoi(schema.createTransactions, req.body as Prisma.TransactionsUncheckedCreateInput);
    payload.user_sub = sub;

    const data = await service.createTransaction(payload);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const dashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sub } = res.locals;

    const data = await service.getDashboard({ id: Number(req.params.id), user_sub: sub });

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const listBucket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sub } = res.locals;

    const data = await service.listBucket(sub);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
export const createBucket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sub } = res.locals;
    const payload = validateJoi(schema.bucketsPayload, req.body as Prisma.BucketsUncheckedCreateInput);
    payload.user_sub = sub;

    const data = await service.createBucket(payload);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
export const updateBucket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sub } = res.locals;
    const body = validateJoi(schema.bucketsPayload, req.body as Prisma.BucketsUncheckedCreateInput);

    const payload: Pick<Buckets, "id" | "name" | "description" | "target" | "user_sub"> = {
      id: body.id!,
      name: body.name,
      description: body.description,
      target: body.target,
      user_sub: sub,
    };

    const data = await service.editBucket(payload);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
export const getBucket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sub } = res.locals;
    const id = req.params.id;

    const data = await service.getBucket({ id: Number(id), user_sub: sub });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const removeBucket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sub } = res.locals;
    const id = req.params.id;

    const data = await service.removeBucket({ id: Number(id), user_sub: sub });
    res.json({ data });
  } catch (error) {
    next(error);
  }
};

export const removeAllTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sub } = res.locals;

    const data = await service.removeAllTransaction({ user_sub: sub });
    res.json({ data });
  } catch (error) {
    next(error);
  }
};
