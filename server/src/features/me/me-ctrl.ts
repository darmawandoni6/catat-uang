import type { NextFunction, Request, Response } from "express";

import { getMe } from "./me-service";

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sub } = res.locals;

    const me = await getMe(sub);

    res.json(me);
  } catch (error) {
    next(error);
  }
};
