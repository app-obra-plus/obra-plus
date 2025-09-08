/*
  Warnings:

  - You are about to drop the column `isDonation` on the `tb_advertisements` table. All the data in the column will be lost.
  - Added the required column `is_donation` to the `tb_advertisements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_advertisements" DROP COLUMN "isDonation",
ADD COLUMN     "is_donation" BOOLEAN NOT NULL;
