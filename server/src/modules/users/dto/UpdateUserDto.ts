import { z } from 'zod';

export const UpdateUserSchema = z.object({
  first_name: z.string().min(2, 'Nome muito curto').optional(),
  last_name: z.string().min(2, 'Sobrenome muito curto').optional(),
  phone_number: z.string().min(11, 'Número inválido').optional(),
  profile_picture: z.string().url().optional(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;