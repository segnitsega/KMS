-- CreateEnum
CREATE TYPE "public"."TaskSatus" AS ENUM ('PENDING', 'ONPROGRESS', 'DONE');

-- CreateTable
CREATE TABLE "public"."Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "taskResource" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "priorityLevel" TEXT NOT NULL,
    "dueDate" TEXT NOT NULL,
    "taskStatus" "public"."TaskSatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
