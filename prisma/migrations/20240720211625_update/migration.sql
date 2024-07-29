/*
  Warnings:

  - You are about to drop the column `movie` on the `Watchedlist` table. All the data in the column will be lost.
  - Added the required column `movieId` to the `Watchedlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Watchedlist" DROP COLUMN "movie",
ADD COLUMN     "movieId" TEXT NOT NULL;
