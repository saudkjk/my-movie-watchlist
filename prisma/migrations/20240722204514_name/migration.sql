/*
  Warnings:

  - You are about to drop the `Watchedlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Watchedlist";

-- CreateTable
CREATE TABLE "Completed" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Completed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Completed_userId_movieId_key" ON "Completed"("userId", "movieId");
