import type { NextFunction, Request, Response } from "express";

import { getMe, getSummary } from "./me-service";

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sub } = res.locals;

    const [me, summary] = await Promise.all([getMe(sub), getSummary(sub)]);

    res.json({ me, summary });
  } catch (error) {
    next(error);
  }
};
