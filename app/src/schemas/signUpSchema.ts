import z from "zod";

export const signUpSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirm_password: z.string().min(6, "A confirmação de senha deve ter pelo menos 6 caracteres"),
  first_name: z.string().min(2, "O primeiro nome deve ter pelo menos 2 caracteres"),
  last_name: z.string().min(2, "O sobrenome deve ter pelo menos 2 caracteres"),
  phone_number: z.string().min(10, "O número de telefone deve ter pelo menos 10 caracteres"),
  profile_picture: z.string().min(1, "A foto de perfil é obrigatória"),
}).refine((data) => data.password === data.confirm_password, {
  message: "As senhas não coincidem",
  path: ["confirm_password"],
})