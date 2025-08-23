/*
  Warnings:

  - The primary key for the `transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `amount` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/

-- Ubah tabel transactions
ALTER TABLE "public"."transactions" 
DROP CONSTRAINT "transactions_pkey",
ALTER COLUMN "id" TYPE INTEGER,
ALTER COLUMN "amount" TYPE INTEGER,
ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("id");