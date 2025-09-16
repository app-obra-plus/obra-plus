
import z from "zod";
interface AddressResponseDto {
  addressName: string;
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
    addressName: z.string().trim().min(1, 'Nome do endereço é obrigatória'),
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

interface CreateAddressDto extends z.infer<typeof CreateAddressSchema> {}

export {
  AddressResponseDto,
  AddressUpdateDto,
  CreateAddressDto,
  CreateAddressSchema
}