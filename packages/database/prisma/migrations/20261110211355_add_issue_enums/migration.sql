/*
  Warnings:

  - The values [TODO,COMPLETED] on the enum `IssueStatus` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `priority` on the `Issue` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "IssuePriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- AlterEnum
BEGIN;
CREATE TYPE "IssueStatus_new" AS ENUM ('TO_DO', 'IN_PROGRESS', 'REVIEW', 'DONE');
ALTER TABLE "public"."Issue" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Issue" ALTER COLUMN "status" TYPE "IssueStatus_new" USING ("status"::text::"IssueStatus_new");
ALTER TYPE "IssueStatus" RENAME TO "IssueStatus_old";
ALTER TYPE "IssueStatus_new" RENAME TO "IssueStatus";
DROP TYPE "public"."IssueStatus_old";
ALTER TABLE "Issue" ALTER COLUMN "status" SET DEFAULT 'TO_DO';
COMMIT;

-- AlterEnum
ALTER TYPE "IssueType" ADD VALUE 'TASK';

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "priority",
ADD COLUMN     "priority" "IssuePriority" NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'TO_DO';
