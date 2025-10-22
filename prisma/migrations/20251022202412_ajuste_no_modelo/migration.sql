/*
  Warnings:

  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChatParticipant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatParticipant" DROP CONSTRAINT "ChatParticipant_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "ChatParticipant" DROP CONSTRAINT "ChatParticipant_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_sender_id_fkey";

-- DropTable
DROP TABLE "Chat";

-- DropTable
DROP TABLE "ChatParticipant";

-- DropTable
DROP TABLE "Message";

-- CreateTable
CREATE TABLE "tb_chat" (
    "id" UUID NOT NULL,
    "type" "ChatType" NOT NULL DEFAULT 'PRIVATE',
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_chat_participant" (
    "id" UUID NOT NULL,
    "chat_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role" "ChatRole" NOT NULL DEFAULT 'MEMBER',
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastRead_at" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "tb_chat_participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_message" (
    "id" UUID NOT NULL,
    "chat_id" UUID NOT NULL,
    "sender_id" UUID NOT NULL,
    "content" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_chat_participant_chat_id_user_id_key" ON "tb_chat_participant"("chat_id", "user_id");

-- AddForeignKey
ALTER TABLE "tb_chat_participant" ADD CONSTRAINT "tb_chat_participant_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "tb_chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_chat_participant" ADD CONSTRAINT "tb_chat_participant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_message" ADD CONSTRAINT "tb_message_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "tb_chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_message" ADD CONSTRAINT "tb_message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
