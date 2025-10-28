/*
  Warnings:

  - Made the column `content` on table `tb_message` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tb_message" ALTER COLUMN "content" SET NOT NULL;
