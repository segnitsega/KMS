/*
  Warnings:

  - A unique constraint covering the columns `[userId,bookId]` on the table `UserLibrary` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserLibrary_userId_bookId_key" ON "public"."UserLibrary"("userId", "bookId");
