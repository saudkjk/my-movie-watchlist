/*
  Warnings:

  - Added the required column `moviePoster` to the `CustomList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomList" ADD COLUMN     "moviePoster" TEXT NOT NULL;
