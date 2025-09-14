/*
  Warnings:

  - The values [INACTIVE,EXPIRED] on the enum `AdvertisementStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `advertisementAddressId` on the `tb_advertisements` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `tb_user` table. All the data in the column will be lost.
  - Added the required column `advertisement_address_id` to the `tb_advertisements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `tb_advertisements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_of_measure` to the `tb_advertisements` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UnitOfMeasure" AS ENUM ('UNIT', 'KG', 'LITER', 'METER');

-- AlterEnum
BEGIN;
CREATE TYPE "AdvertisementStatus_new" AS ENUM ('ACTIVE', 'SOLD', 'PAUSED');
ALTER TABLE "tb_advertisements" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "tb_advertisements" ALTER COLUMN "status" TYPE "AdvertisementStatus_new" USING ("status"::text::"AdvertisementStatus_new");
ALTER TYPE "AdvertisementStatus" RENAME TO "AdvertisementStatus_old";
ALTER TYPE "AdvertisementStatus_new" RENAME TO "AdvertisementStatus";
DROP TYPE "AdvertisementStatus_old";
ALTER TABLE "tb_advertisements" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- DropForeignKey
ALTER TABLE "tb_advertisements" DROP CONSTRAINT "tb_advertisements_advertisementAddressId_fkey";

-- AlterTable
ALTER TABLE "tb_addresses" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "tb_advertisement_addresses" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "tb_advertisements" DROP COLUMN "advertisementAddressId",
ADD COLUMN     "advertisement_address_id" UUID NOT NULL,
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "unit_of_measure" "UnitOfMeasure" NOT NULL;

-- AlterTable
ALTER TABLE "tb_user" DROP COLUMN "active",
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "tb_advertisements" ADD CONSTRAINT "tb_advertisements_advertisement_address_id_fkey" FOREIGN KEY ("advertisement_address_id") REFERENCES "tb_advertisement_addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
