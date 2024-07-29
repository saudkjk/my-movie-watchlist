/*
  Warnings:

  - Added the required column `comments` to the `Watchlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visibility` to the `Watchlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Watchlist" ADD COLUMN     "comments" TEXT NOT NULL,
ADD COLUMN     "visibility" TEXT NOT NULL;
