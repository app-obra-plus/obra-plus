import Input from "../../../../components/AuthFormComponents/Input";
import { useSignUpStore } from "../store/useSignUpStore";
import { useState } from "react";
import { emailSchema } from "../../../../schemas/signUpSchema"; // importa apenas o schema de email
import { StepProps } from "./StepProps";

export default function Step1({setIsValid}: StepProps) {
  const { registerForm, setRegisterForm } = useSignUpStore();
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  const handleChangeEmail = (email: string) => {
    setRegisterForm({ ...registerForm, email });

    const result = emailSchema.safeParse(email);
    setEmailError(result.success ? undefined : result.error.errors[0]?.message);
    setIsValid(result.success);
  };

  return (
    <Input
      placeholder="Email"
      icon="mail"
      value={registerForm.email}
      onChangeText={handleChangeEmail}
      error={emailError}
    />
  );
}
