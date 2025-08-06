/*
  Warnings:

  - The `category` column on the `Article` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `category` column on the `Discussion` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Article" DROP COLUMN "category",
ADD COLUMN     "category" TEXT[];

-- AlterTable
ALTER TABLE "public"."Discussion" DROP COLUMN "category",
ADD COLUMN     "category" TEXT[];
