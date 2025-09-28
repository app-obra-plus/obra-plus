import Input from "../../../../components/AuthFormComponents/Input";
import { useSignUpStore } from "../store/useSignUpStore";
import { useState } from "react";
import { emailSchema } from "../../../../schemas/signUpSchema"; // importa apenas o schema de email
import { StepProps } from "./StepProps";
import InputText from "../../../../components/Input";

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
    <InputText
      placeholder="Email"
      // icon="mail"
      label="Email"
      value={registerForm.email}
      onChange={handleChangeEmail}
      // error={emailError}
    />
  );
}
