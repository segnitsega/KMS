/*
  Warnings:

  - Added the required column `description` to the `Discussion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Discussion" ADD COLUMN     "description" TEXT NOT NULL;
