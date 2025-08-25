import jwt from "jsonwebtoken";

export const generateToken = (data: object): string => {
  const { ACCESS_TOKEN } = process.env;

  const token = jwt.sign(data, ACCESS_TOKEN, { expiresIn: "7d" });
  return token;
};
