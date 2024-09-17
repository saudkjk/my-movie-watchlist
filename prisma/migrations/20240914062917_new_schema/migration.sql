/*
  Warnings:

  - You are about to drop the column `moviePoster` on the `CustomList` table. All the data in the column will be lost.
  - Added the required column `moviePoster` to the `CustomListItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomList" DROP COLUMN "moviePoster";

-- AlterTable
ALTER TABLE "CustomListItem" ADD COLUMN     "moviePoster" TEXT NOT NULL;
