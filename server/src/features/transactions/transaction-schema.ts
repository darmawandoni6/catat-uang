import Joi from "joi";

import { Buckets, Transactions } from "@prisma/client";

export const createTransactions = Joi.object<Transactions>({
  type: Joi.string().allow("expense", "income").required(),
  amount: Joi.number().min(1).required(),
  category: Joi.string().required(),
  description: Joi.string().allow(""),
  date: Joi.string().required(),
  bucket_id: Joi.number().required(),
});

export const bucketsPayload = Joi.object<Buckets>({
  id: Joi.number(),
  name: Joi.string().min(1).max(20).required(),
  description: Joi.string().required(),
  target: Joi.number().required().default(0),
});
