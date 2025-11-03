-- DropForeignKey
ALTER TABLE "public"."Discussion" DROP CONSTRAINT "Discussion_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DocumentVersion" DROP CONSTRAINT "DocumentVersion_documentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Replies" DROP CONSTRAINT "Replies_discussionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Replies" DROP CONSTRAINT "Replies_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserDetail" DROP CONSTRAINT "UserDetail_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."UserDetail" ADD CONSTRAINT "UserDetail_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DocumentVersion" ADD CONSTRAINT "DocumentVersion_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "public"."Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Discussion" ADD CONSTRAINT "Discussion_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Replies" ADD CONSTRAINT "Replies_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "public"."Discussion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Replies" ADD CONSTRAINT "Replies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
