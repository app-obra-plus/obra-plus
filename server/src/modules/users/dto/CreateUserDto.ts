import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha muito curta'),
  first_name: z.string().min(2, 'Nome muito curto'),
  last_name: z.string().min(2, 'Sobrenome muito curto'),
  phone_number: z.string().min(11, 'Número inválido'),
  profile_picture: z.string().url().optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
