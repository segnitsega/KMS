-- AlterTable
ALTER TABLE "public"."TaskSubmission" ADD COLUMN     "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
