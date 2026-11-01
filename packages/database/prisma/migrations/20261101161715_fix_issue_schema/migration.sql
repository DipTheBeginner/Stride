/*
  Warnings:

  - The values [VIEWER] on the enum `ProjectRole` will be removed. If these variants are still used in the database, this will fail.
  - The `status` column on the `Issue` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "IssueStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'COMPLETED');

-- AlterEnum
BEGIN;
CREATE TYPE "ProjectRole_new" AS ENUM ('LEAD', 'MEMBER');
ALTER TABLE "public"."ProjectMember" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "ProjectMember" ALTER COLUMN "role" TYPE "ProjectRole_new" USING ("role"::text::"ProjectRole_new");
ALTER TYPE "ProjectRole" RENAME TO "ProjectRole_old";
ALTER TYPE "ProjectRole_new" RENAME TO "ProjectRole";
DROP TYPE "public"."ProjectRole_old";
ALTER TABLE "ProjectMember" ALTER COLUMN "role" SET DEFAULT 'MEMBER';
COMMIT;

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "status",
ADD COLUMN     "status" "IssueStatus" NOT NULL DEFAULT 'TODO',
ALTER COLUMN "assigneeId" DROP NOT NULL,
ALTER COLUMN "createdById" DROP NOT NULL;

-- DropEnum
DROP TYPE "TaskStatus";

-- CreateIndex
CREATE INDEX "Issue_projectId_status_idx" ON "Issue"("projectId", "status");
