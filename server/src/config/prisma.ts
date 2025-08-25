import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ["error", "info"],
  errorFormat: "pretty",
  transactionOptions: {
    maxWait: 5000,
    timeout: 15000,
  },
});
