import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(255, "O nome deve ter no máximo 255 caracteres"),

  description: z
    .string()
    .min(10, "A descrição deve ter no mínimo 10 caracteres")
    .max(1000, "A descrição deve ter no máximo 1000 caracteres"),
});

export const UpdateCategorySchema = CreateCategorySchema.partial();

export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>;
