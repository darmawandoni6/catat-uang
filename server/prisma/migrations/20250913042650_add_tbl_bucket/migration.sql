-- AlterTable
ALTER TABLE "public"."transactions" ADD COLUMN     "bucket_id" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_bucket_id_fkey" FOREIGN KEY ("bucket_id") REFERENCES "public"."buckets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
