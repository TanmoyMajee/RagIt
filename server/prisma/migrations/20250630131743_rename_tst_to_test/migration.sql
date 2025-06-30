/*
  Warnings:

  - You are about to drop the `tst` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "tst";

-- CreateTable
CREATE TABLE "test" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "test_email_key" ON "test"("email");
