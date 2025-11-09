import { z } from 'zod';

export const MessageSchema = z.object({
    chatId: z.string().uuid("ID de chat inválido"),
    senderId: z.string().uuid("ID de emissário inválido"),
    content: z.string().min(1,"Menssagem vazia")
}).strict()
export type MessageDto = z.infer<typeof MessageSchema>;

export interface  MessageResponse {
  createdAt: Date;
  senderId: string;
  content: string;
}