-- CreateTable
CREATE TABLE "public"."buckets" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" TEXT NOT NULL,
    "target" INTEGER NOT NULL,
    "remaining_target" INTEGER NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_sub" VARCHAR(255) NOT NULL,

    CONSTRAINT "buckets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."buckets" ADD CONSTRAINT "buckets_user_sub_fkey" FOREIGN KEY ("user_sub") REFERENCES "public"."users"("sub") ON DELETE RESTRICT ON UPDATE CASCADE;
