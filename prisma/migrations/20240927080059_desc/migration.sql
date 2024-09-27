/*
  Warnings:

  - Added the required column `description` to the `Tutorial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tutorial" ADD COLUMN     "description" TEXT NOT NULL;
