import { prisma } from "@config/prisma";
import { Buckets, Prisma, Transactions } from "@prisma/client";

export async function getDashboard(params: Pick<Buckets, "user_sub" | "id">) {
  const where: Prisma.TransactionsWhereInput = {
    bucket_id: params.id,
    user_sub: params.user_sub,
  };

  const data = await prisma.transactions.findMany({
    where,
    orderBy: {
      date: "desc",
    },
  });

  return data;
}

export async function createTransaction(data: Prisma.TransactionsUncheckedCreateInput): Promise<Transactions> {
  const data_bucket: Prisma.BucketsUpdateInput = {};

  if (data.type === "income") {
    data_bucket.total_income = {
      increment: data.amount,
    };
    data_bucket.total_balance = {
      increment: data.amount,
    };
  } else {
    data_bucket.total_expense = {
      decrement: data.amount,
    };
    data_bucket.total_balance = {
      decrement: data.amount,
    };
  }

  const res = await prisma.$transaction(async (trx) => {
    const [res] = await Promise.all([
      trx.transactions.create({ data }),
      trx.buckets.update({
        where: { id: Number(data.bucket_id) },
        data: data_bucket,
      }),
    ]);
    return res;
  });
  return res;
}

export async function listBucket(user_sub: string): Promise<Buckets[]> {
  const buckets = await prisma.buckets.findMany({
    where: { user_sub },
    orderBy: [
      {
        created_at: "desc",
      },
      { target: "desc" },
    ],
  });

  return buckets;
}
export async function createBucket(data: Prisma.BucketsUncheckedCreateInput): Promise<Buckets> {
  const res = await prisma.buckets.create({ data });
  return res;
}

export async function editBucket({
  id,
  user_sub,
  ...data
}: Pick<Buckets, "id" | "name" | "description" | "target" | "user_sub">): Promise<Buckets> {
  const res = await prisma.buckets.update({ where: { id, user_sub }, data });
  return res;
}
export async function removeBucket({ id, user_sub }: Pick<Buckets, "id" | "user_sub">): Promise<void> {
  await prisma.$transaction(async (trx) => {
    await Promise.all([
      trx.buckets.delete({ where: { id, user_sub } }),
      trx.transactions.deleteMany({ where: { bucket_id: id, user_sub } }),
    ]);
  });
}

export async function removeAllTransaction({ user_sub }: Pick<Buckets, "user_sub">): Promise<void> {
  await prisma.$transaction(async (trx) => {
    await Promise.all([
      trx.buckets.deleteMany({ where: { user_sub } }),
      trx.transactions.deleteMany({ where: { user_sub: user_sub } }),
    ]);
  });
}

export async function getBucket({ id, user_sub }: Pick<Buckets, "id" | "user_sub">) {
  const res = await prisma.buckets.findFirst({
    where: { id, user_sub },
  });
  return res;
}
