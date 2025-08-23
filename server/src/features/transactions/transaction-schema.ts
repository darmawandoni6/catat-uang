import Joi from "joi";

import { Transactions } from "@prisma/client";

import { TransactionsParams } from "./types";

export const createPayload = Joi.object<Transactions>({
  type: Joi.string().allow("expense", "income").required(),
  amount: Joi.number().min(1).required(),
  category: Joi.string().required(),
  description: Joi.string().allow(""),
  date: Joi.string().required(),
});
export const listPayload = Joi.object<TransactionsParams>({
  page: Joi.string().default("1"),
  pageSize: Joi.string().default("50"),
  type: Joi.string().allow("day", "month", "year").default("month"),
});

export const dashboardParams = Joi.object<Pick<TransactionsParams, "type">>({
  type: Joi.string().allow("day", "month", "year").default("month"),
});
