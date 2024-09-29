/*
  Warnings:

  - Added the required column `price` to the `Tutorial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable

-- Add the column as nullable
ALTER TABLE "Tutorial" ADD COLUMN "price" INTEGER;

-- Update existing rows (replace 0 with whatever default price you want)
UPDATE "Tutorial" SET "price" = 0 WHERE "price" IS NULL;

-- Make the column non-nullable
ALTER TABLE "Tutorial" ALTER COLUMN "price" SET NOT NULL;