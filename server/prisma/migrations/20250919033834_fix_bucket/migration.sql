/*
  Warnings:

  - You are about to drop the column `total_amount` on the `buckets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."buckets" DROP CONSTRAINT "buckets_user_sub_fkey";

-- AlterTable
ALTER TABLE "public"."buckets" DROP COLUMN "total_amount",
ADD COLUMN     "total_balance" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_expense" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_income" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "public"."buckets" ADD CONSTRAINT "buckets_user_sub_fkey" FOREIGN KEY ("user_sub") REFERENCES "public"."users"("sub") ON DELETE CASCADE ON UPDATE CASCADE;
