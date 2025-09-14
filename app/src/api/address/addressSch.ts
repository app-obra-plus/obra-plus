
import z from "zod";
interface AddressResponseDto {
  id: string;
  street: string;
  number: string;
  complement?: string | null;
  neighborhood: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface AddressUpdateDto{
  street?: string;
  number?: string;
  complement?: string | null;
  neighborhood?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

const CreateAddressSchema = z.object({
  street: z.string({ required_error: 'Rua é obrigatória' }).trim().min(1, 'Rua é obrigatória'),
  number: z.string({ required_error: 'Número é obrigatório' }).trim().min(1, 'Número é obrigatório'),
  complement: z.string().trim().optional(),
  neighborhood: z.string({ required_error: 'Bairro é obrigatório' }).trim().min(1, 'Bairro é obrigatório'),
  city: z.string({ required_error: 'Cidade é obrigatória' }).trim().min(1, 'Cidade é obrigatória'),
  state: z.string({ required_error: 'Estado é obrigatório' }).trim().min(1, 'Estado é obrigatório'),
  postal_code: z.string({ required_error: 'CEP é obrigatório' }).trim().min(1, 'CEP é obrigatório'),
  country: z.string({ required_error: 'País é obrigatório' }).trim().min(1, 'País é obrigatório'),
  latitude: z.number({ required_error: 'Latitude é obrigatória' }),
  longitude: z.number({ required_error: 'Longitude é obrigatória' })
});

interface CreateAddressDto extends z.infer<typeof CreateAddressSchema> {}

export {
  AddressResponseDto,
  AddressUpdateDto,
  CreateAddressDto,
  CreateAddressSchema
}