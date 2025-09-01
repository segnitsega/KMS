/*
  Warnings:

  - The `taskStatus` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."TaskStatus" AS ENUM ('PENDING', 'ONPROGRESS', 'DONE');

-- AlterTable
ALTER TABLE "public"."Task" DROP COLUMN "taskStatus",
ADD COLUMN     "taskStatus" "public"."TaskStatus" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "public"."TaskSatus";

-- CreateTable
CREATE TABLE "public"."TaskSubmission" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "documentUrl" TEXT,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "TaskSubmission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."TaskSubmission" ADD CONSTRAINT "TaskSubmission_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
