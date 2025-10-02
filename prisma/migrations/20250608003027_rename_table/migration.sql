/*
  Warnings:

  - You are about to drop the column `phone_numer` on the `tb_user` table. All the data in the column will be lost.
  - Added the required column `phone_number` to the `tb_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_user" DROP COLUMN "phone_numer",
ADD COLUMN     "phone_number" TEXT NOT NULL;
