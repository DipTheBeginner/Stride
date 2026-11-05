/*
  Warnings:

  - Added the required column `type` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IssueType" AS ENUM ('BUG', 'FEATURE', 'IMPROVEMENT');

-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "labels" TEXT[],
ADD COLUMN     "type" "IssueType" NOT NULL;
