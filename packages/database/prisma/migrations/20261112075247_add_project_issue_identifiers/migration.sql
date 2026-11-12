/*
  Warnings:

  - A unique constraint covering the columns `[projectId,number]` on the table `Issue` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "number" INTEGER;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "issueCounter" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "key" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Issue_projectId_number_key" ON "Issue"("projectId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "Project_key_key" ON "Project"("key");
