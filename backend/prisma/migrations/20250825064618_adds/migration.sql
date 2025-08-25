/*
  Warnings:

  - Added the required column `bookUrl` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedAt` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Book" ADD COLUMN     "bookUrl" TEXT NOT NULL,
ADD COLUMN     "uploadedAt" TIMESTAMP(3) NOT NULL;
