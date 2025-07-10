import { z } from 'zod';

export const CreateAddressSchema = z.object({
    street: z.string().trim().min(1, 'Rua é obrigatória'),
    number: z.string().trim().min(1, 'Número é obrigatório'),
    complement: z.string().trim().optional(),
    neighborhood: z.string().trim().min(1, 'Bairro é obrigatório'),
    city: z.string().trim().min(1, 'Cidade é obrigatória'),
    state: z.string().trim().min(1, 'Estado é obrigatório'),
    postal_code: z.string().trim().min(1, 'CEP é obrigatório'),
    country: z.string().trim().min(1, 'País é obrigatório'),
    latitude: z.number(),
    longitude: z.number()
});


export type CreateAddressDto = z.infer<typeof CreateAddressSchema>;