import { z } from "zod";

export const emailSchema = z
  .string()
  .email("O email deve ser válido")
  .min(1, "O email é obrigatório");

export const passwordSchema = z
  .string()
  .min(6, "A senha deve ter pelo menos 6 caracteres");

export const confirmPasswordSchema = z
  .string()

export const firstNameSchema = z
  .string()
  .min(2, "O primeiro nome deve ter pelo menos 2 caracteres");

export const lastNameSchema = z
  .string()
  .min(2, "O sobrenome deve ter pelo menos 2 caracteres");

export const phoneNumberSchema = z
  .string()
  .min(11, "O número de telefone deve ter pelo menos 10 caracteres");

export const profilePictureSchema = z
  .string()
  .min(1, "A foto de perfil é obrigatória");

export const signUpSchemaBase = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirm_password: confirmPasswordSchema,
  first_name: firstNameSchema,
  last_name: lastNameSchema,
  phone_number: phoneNumberSchema,
  profile_picture: profilePictureSchema,
});

export const signUpSchema = signUpSchemaBase.refine(
  (data) => data.password === data.confirm_password,
  {
    message: "As senhas não coincidem",
    path: ["confirm_password"],
  }
);

export type SignUpForm = z.infer<typeof signUpSchema>;
