import createHttpError from "http-errors";

import { prisma } from "@config/prisma";
import { Users } from "@prisma/client";

export async function getSummary(user_sub: string) {
  const [income, expense] = await Promise.all([
    prisma.transactions.aggregate({
      _sum: { amount: true },
      where: {
        user_sub,
        type: "income",
      },
    }),
    prisma.transactions.aggregate({
      _sum: { amount: true },
      where: {
        user_sub,
        type: "expense",
      },
    }),
  ]);

  const totalIncome = income._sum.amount || 0;
  const totalExpense = expense._sum.amount || 0;

  // Saldo = income - expense
  const balance = totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    balance,
  };
}

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
