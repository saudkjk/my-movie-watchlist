/*
  Warnings:

  - Added the required column `username` to the `CustomList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomList" ADD COLUMN     "username" TEXT NOT NULL;
