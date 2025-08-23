/*
  Warnings:

  - You are about to drop the column `email_user` on the `transactions` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_sub` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_token` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_token` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."transactions" DROP CONSTRAINT "transactions_email_user_fkey";

-- AlterTable
ALTER TABLE "public"."transactions" DROP COLUMN "email_user",
ADD COLUMN     "user_sub" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" DROP CONSTRAINT "users_pkey",
ADD COLUMN     "access_token" TEXT NOT NULL,
ADD COLUMN     "refresh_token" TEXT NOT NULL,
ADD COLUMN     "sub" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("sub");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_user_sub_fkey" FOREIGN KEY ("user_sub") REFERENCES "public"."users"("sub") ON DELETE RESTRICT ON UPDATE CASCADE;
