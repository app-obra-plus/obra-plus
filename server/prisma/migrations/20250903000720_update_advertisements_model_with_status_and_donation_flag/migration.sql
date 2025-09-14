/*
  Warnings:

  - You are about to drop the column `is_active` on the `tb_advertisements` table. All the data in the column will be lost.
  - Added the required column `isDonation` to the `tb_advertisements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `tb_advertisements` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AdvertisementStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SOLD', 'PAUSED', 'EXPIRED');

-- AlterTable
ALTER TABLE "tb_advertisements" DROP COLUMN "is_active",
ADD COLUMN     "isDonation" BOOLEAN NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "AdvertisementStatus" NOT NULL DEFAULT 'ACTIVE';
