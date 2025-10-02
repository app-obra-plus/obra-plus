/*
  Warnings:

  - The primary key for the `tb_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `tb_user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "tb_user" DROP CONSTRAINT "tb_user_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "tb_addresses" (
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
    "user_id" UUID NOT NULL,

    CONSTRAINT "tb_addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_addresses" ADD CONSTRAINT "tb_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
