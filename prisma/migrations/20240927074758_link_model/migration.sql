/*
  Warnings:

  - The primary key for the `Tutorial` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `links` on the `Tutorial` table. All the data in the column will be lost.
  - The `id` column on the `Tutorial` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Tutorial" DROP CONSTRAINT "Tutorial_pkey",
DROP COLUMN "links",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Tutorial_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tutorialId" INTEGER NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_tutorialId_fkey" FOREIGN KEY ("tutorialId") REFERENCES "Tutorial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
