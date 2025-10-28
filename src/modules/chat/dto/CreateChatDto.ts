import { z } from 'zod';

export const CreateChatSchema = z.object({
    chatName: z.string().trim().optional(),
    participantsId: z.array(z.string().uuid("ID de participante inválido")).min(2, { message: "O chat precisa ter pelo menos 2 participantes." }),
}).strict();
export type CreateChatDto = z.infer<typeof CreateChatSchema>;