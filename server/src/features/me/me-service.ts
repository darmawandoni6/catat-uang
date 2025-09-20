import createHttpError from "http-errors";

import { prisma } from "@config/prisma";
import { Users } from "@prisma/client";

export async function getMe(sub: string): Promise<Pick<Users, "sub" | "email" | "name">> {
  const data = await prisma.users.findFirst({
    where: { sub },
    select: {
      sub: true,
      email: true,
      name: true,
    },
  });
  if (!data) throw createHttpError.Unauthorized();
  return data;
}
