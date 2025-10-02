-- CreateTable
CREATE TABLE "tb_advertisements" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
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

    CONSTRAINT "tb_advertisements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_images" (
    "id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "advertisement_id" UUID NOT NULL,

    CONSTRAINT "tb_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_category" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_advertisements" ADD CONSTRAINT "tb_advertisements_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_advertisements" ADD CONSTRAINT "tb_advertisements_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "tb_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_images" ADD CONSTRAINT "tb_images_advertisement_id_fkey" FOREIGN KEY ("advertisement_id") REFERENCES "tb_advertisements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
