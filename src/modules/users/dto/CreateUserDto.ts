import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().trim().min(6, 'Senha muito curta'),
  first_name: z.string().trim().min(2, 'Nome muito curto'),
  last_name: z.string().trim().min(2, 'Sobrenome muito curto'),
  phone_number: z.string().trim().length(11, 'O número deve conter exatamente 11 dígitos (DDD + número).').regex(/^(\d{2})9\d{8}$/, 'O número deve começar com o DDD seguido de 9 e mais 8 dígitos (ex: 11987654321).'),
  profile_picture: z.string().url().optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
