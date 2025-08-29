/*
  Warnings:

  - You are about to drop the column `lastQueryDate` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `queryCount` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "conversations" ADD COLUMN     "queryCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "lastQueryDate",
DROP COLUMN "queryCount";
