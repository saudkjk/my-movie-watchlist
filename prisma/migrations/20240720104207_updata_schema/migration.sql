/*
  Warnings:

  - Added the required column `userId` to the `Watchedlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Watchlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Watchedlist" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "rating" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Watchlist" ADD COLUMN     "userId" TEXT NOT NULL;
