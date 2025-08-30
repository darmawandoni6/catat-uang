import { prisma } from "@config/prisma";
import { Prisma, Transactions } from "@prisma/client";
import { endOfDay, endOfMonth, endOfYear, startOfDay, startOfMonth, startOfYear } from "@util/date";

import { TransactionsParams } from "./types";

export const create = async (data: Prisma.TransactionsUncheckedCreateInput) => {
  await prisma.transactions.create({ data });
};

export const list = async (params: TransactionsParams): Promise<{ data: Transactions[]; count: number }> => {
  const page = Number(params.page);
  const pageSize = Number(params.pageSize);

  const gte = {
    day: startOfDay,
    month: startOfMonth,
    year: startOfYear,
  };
  const lte = {
    day: endOfDay,
    month: endOfMonth,
    year: endOfYear,
  };

  const where: Prisma.TransactionsWhereInput = {
    date: {
      gte: gte[params.type],
      lte: lte[params.type],
    },
    user_sub: params.sub,
  };

  const [data, count] = await Promise.all([
    prisma.transactions.findMany({
      where,
      orderBy: {
        date: "desc",
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.transactions.count({ where }),
  ]);

  return { data, count };
};

export async function getGrafikTransactions(params: Pick<TransactionsParams, "sub" | "type">) {
  const gte = {
    day: startOfDay,
    month: startOfMonth,
    year: startOfYear,
  };
  const lte = {
    day: endOfDay,
    month: endOfMonth,
    year: endOfYear,
  };

  const where: Prisma.TransactionsWhereInput = {
    date: {
      gt: gte[params.type],
      lte: lte[params.type],
    },
    user_sub: params.sub,
  };

  const transactions = await prisma.transactions.findMany({
    where,
    select: { type: true, amount: true, date: true },
  });
  const result: { [K: string]: { expanse: number; income: number; balance: number } } = {};

  transactions.forEach((item) => {
    const date = {
      day: new Date(item.date).getHours() + 1,
      month: new Date(item.date).getDate(),
      year: new Date(item.date).getMonth() + 1,
    };

    const type = date[params.type];
    if (!result[type]) {
      result[type] = {
        expanse: 0,
        income: 0,
        balance: 0,
      };
    }
    if (item.type === "income") {
      result[type].income += item.amount;
    } else if (item.type === "expense") {
      result[type].expanse += item.amount;
    }
    const { income, balance } = result[type];
    result[type].balance = income - balance;
  });

  return result;
}

export async function getStatic(params: Pick<TransactionsParams, "sub" | "type">) {
  const gte = {
    day: startOfDay,
    month: startOfMonth,
    year: startOfYear,
  };
  const lte = {
    day: endOfDay,
    month: endOfMonth,
    year: endOfYear,
  };

  const where: Prisma.TransactionsWhereInput = {
    date: {
      gte: gte[params.type],
      lte: lte[params.type],
    },
    user_sub: params.sub,
  };

  const [typeTransaction, categoryTransaction] = await Promise.all([
    prisma.transactions.groupBy({
      by: ["type"],
      _count: {
        type: true,
      },
      where: {
        ...where,
        type: {
          in: ["expense", "income"],
        },
      },
    }),
    prisma.transactions.groupBy({
      by: ["category"],
      _sum: {
        amount: true,
      },
      where: {
        ...where,
        type: "expense",
      },
    }),
  ]);

  const totalType: { [K: string]: number } = {};
  typeTransaction.forEach((element) => {
    totalType[element.type] = Number(element._count.type);
  });

  const totalCategory: { [K: string]: number } = {};
  categoryTransaction.forEach((element) => {
    totalCategory[element.category] = Number(element._sum.amount);
  });

  return {
    totalType,
    totalCategory,
  };
}

export async function removeAll(user_sub: string) {
  await prisma.transactions.deleteMany({ where: { user_sub } });
}
