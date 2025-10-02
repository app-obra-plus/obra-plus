/*
  Warnings:

  - You are about to drop the column `city` on the `tb_advertisements` table. All the data in the column will be lost.
  - You are about to drop the column `complement` on the `tb_advertisements` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `tb_advertisements` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `tb_advertisements` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `tb_advertisements` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood` on the `tb_advertisements` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `tb_advertisements` table. All the data in the column will be lost.
  - You are about to drop the column `postal_code` on the `tb_advertisements` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `tb_advertisements` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `tb_advertisements` table. All the data in the column will be lost.
  - Added the required column `advertisementAddressId` to the `tb_advertisements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_advertisements" DROP COLUMN "city",
DROP COLUMN "complement",
DROP COLUMN "country",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "neighborhood",
DROP COLUMN "number",
DROP COLUMN "postal_code",
DROP COLUMN "state",
DROP COLUMN "street",
ADD COLUMN     "advertisementAddressId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "tb_advertisement_addresses" (
    "id" UUID NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tb_advertisement_addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_advertisements" ADD CONSTRAINT "tb_advertisements_advertisementAddressId_fkey" FOREIGN KEY ("advertisementAddressId") REFERENCES "tb_advertisement_addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
