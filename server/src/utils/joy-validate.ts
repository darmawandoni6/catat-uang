import createHttpError from "http-errors";
import Joi from "joi";

export const validateJoi = <T>(schema: Joi.Schema, payload: T): T => {
  const { error, value } = schema.validate(payload);

  if (error) {
    throw new createHttpError.BadRequest(error.message);
  }

  return value;
};
