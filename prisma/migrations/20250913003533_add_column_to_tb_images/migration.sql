/*
  Warnings:

  - Added the required column `pathname` to the `tb_images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_images" ADD COLUMN     "pathname" TEXT NOT NULL;
