import type { Credentials } from "google-auth-library";

import { prisma } from "@config/prisma";
import type { Prisma, Users } from "@prisma/client";

export const createUser = async (data: Prisma.UsersCreateInput): Promise<void> => {
  await prisma.$transaction(async (trx) => {
    await Promise.all([
      trx.users.create({
        data,
      }),
      trx.buckets.create({
        data: {
          name: "Catat Uang",
          description: "untuk mencatat pengeluaran/pemasukan",
          target: 0,
          user_sub: data.sub,
        },
      }),
    ]);
  });
};

export const isCheckedUser = async (sub: string): Promise<boolean> => {
  const isFind = await prisma.users.count({ where: { sub } });
  return isFind > 0;
};

export const getUser = async (sub: string): Promise<Users | null> => {
  const users = await prisma.users.findUnique({ where: { sub } });
  return users;
};

export const updateUser = async (sub: string, data: Partial<Users>) => {
  await prisma.users.update({ where: { sub }, data });
};

export const getUserData = async (tokens: Credentials): Promise<string> => {
  const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  const data = (await response.json()) as { email: string; sub: string; name: string };

  const isFind = await isCheckedUser(data.sub);
  if (!isFind) {
    await createUser({
      sub: data.sub,
      name: data.name,
      access_token: tokens.access_token!,
      email: data.email,
      refresh_token: tokens.refresh_token!,
    });
  } else {
    await updateUser(data.sub, { access_token: tokens.access_token!, refresh_token: tokens.refresh_token! });
  }
  return data.sub;
};
export const userLogout = async (sub: string): Promise<void> => {
  await prisma.users.update({ where: { sub }, data: { access_token: "", refresh_token: "" } });
};
