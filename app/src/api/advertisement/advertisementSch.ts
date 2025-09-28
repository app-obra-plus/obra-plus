import { z } from "zod";
import { IUser } from "../../types/IAuthResponse";
import { CategoryResponseDto } from "../caregory/categorySch";
import { ResponseAdvertisementAddressDto } from "../advertisementAddress/advertisementAddressSch";

export enum UnitOfMeasure {
  UNIT = 'UNIT',
  KG = 'KG',
  LITER = 'LITER',
  METER = 'METER',
}

export const optionsUnitOfMeasure = [
  { label: 'Unidade', value: UnitOfMeasure.UNIT },
  { label: 'Quilograma', value: UnitOfMeasure.KG },
  { label: 'Litro', value: UnitOfMeasure.LITER },
  { label: 'Metro', value: UnitOfMeasure.METER },
]

export enum AdvertisementStatus {
  ACTIVE = 'ACTIVE',
  SOLD = 'SOLD',
  PAUSED = 'PAUSED'
}

export const unitOfMeasureSchema = z.nativeEnum(UnitOfMeasure)

export const CreateAdvertisementSchema = z.object({
  title: z.string({required_error: "Obrigatório"}).min(3, "Mínimo: 3 caracteres"),
  description: z.string({required_error: "Obrigatório"}).min(10, "Mínimo: 10 caracteres"),
  price: z.number({required_error: "Obrigatório"}).min(0, "Preço negativo"),
  amount: z.number({required_error: "Obrigatório"}).min(1, "Valor inválido"),
  unitOfMeasure: unitOfMeasureSchema,
  isDonation: z.boolean(),
  category_id: z.string({required_error: "Obrigatório"}).uuid("ID de categoria inválido"),
  addressId: z.string({required_error: "Obrigatório"}).uuid("ID de endereço inválido"),
});

export type CreateAdvertisementDto = z.infer<typeof CreateAdvertisementSchema>;

export interface ResponseImageDto {
    id: string
    url: string,
}

export interface ResponseAdvertisementDto {
  id: string;
  title: string;
  description: string;
  price: number;
  status: AdvertisementStatus;
  isDonation: boolean;
  user: IUser;
  category: CategoryResponseDto;
  advertisementAddress: ResponseAdvertisementAddressDto;
  images: ResponseImageDto[];
}


export interface ResponseAdvertisementGridDto {
  latitudeCenter: number;
  longitudeCenter: number;
  advertisementIds: string[];
}


export const AdvertisementStatusSchema = z.nativeEnum(AdvertisementStatus )


const BaseUpdateAdvertisementSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  status: AdvertisementStatusSchema,
  price: z.number().nonnegative("O preço não pode ser negativo"),
  amount: z.number().positive("A quantidade deve ser maior que zero"),
  unitOfMeasure: unitOfMeasureSchema,
  isDonation: z.boolean(),
  category_id: z.string().uuid("ID de categoria inválido"),
}).partial().strict();

export const UpdateAdvertisementSchema = BaseUpdateAdvertisementSchema.superRefine((data, ctx) => {
  if (data.isDonation !== undefined && data.price !== undefined) {
    if (data.isDonation && data.price !== 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Se for doação, o preço deve ser 0",
        path: ["price"],
      });
    }

    if (!data.isDonation && data.price <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Se não for doação, o preço deve ser maior que 0",
        path: ["price"],
      });
    }
  }
});

export type UpdateAdvertisementDto = z.infer<typeof UpdateAdvertisementSchema>;


