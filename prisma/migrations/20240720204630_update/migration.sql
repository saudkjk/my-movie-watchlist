/*
  Warnings:

  - You are about to drop the column `title` on the `Watchedlist` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Watchlist` table. All the data in the column will be lost.
  - Added the required column `movie` to the `Watchedlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movie` to the `Watchlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Watchedlist" DROP COLUMN "title",
ADD COLUMN     "movie" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Watchlist" DROP COLUMN "title",
ADD COLUMN     "movie" TEXT NOT NULL;
