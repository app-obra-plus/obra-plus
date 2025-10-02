/*
  Warnings:

  - Added the required column `address_name` to the `tb_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_addresses" ADD COLUMN     "address_name" TEXT NOT NULL;
