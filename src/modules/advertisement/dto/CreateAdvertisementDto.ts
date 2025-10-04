import { z } from "zod";
import { UnitOfMeasure } from "../../../generated/prisma";

export const unitOfMeasureSchema = z.nativeEnum(UnitOfMeasure)
export type UnitOfMeasureType = z.infer<typeof unitOfMeasureSchema>;

const BaseCreateAdvertisementSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  price: z.number().nonnegative("O preço não pode ser negativo"),
  amount: z.number().positive("A quantidade deve ser maior que zero"),
  unitOfMeasure: unitOfMeasureSchema,
  isDonation: z.boolean(),
  category_id: z.string().uuid("ID de categoria inválido"),
  addressId: z.string().uuid("ID de endereço inválido"),
});

export const CreateAdvertisementSchema = BaseCreateAdvertisementSchema.superRefine((data, ctx) => {
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
});

export type CreateAdvertisementDto = z.infer<typeof CreateAdvertisementSchema>;

