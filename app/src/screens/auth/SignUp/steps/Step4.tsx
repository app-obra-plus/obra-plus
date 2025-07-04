import { useState } from "react";
import Input from "../../../../components/AuthFormComponents/Input";
import { useSignUpStore } from "../store/useSignUpStore";
import { phoneNumberSchema } from "../../../../schemas/signUpSchema";

export default function Step4() {
  const { registerForm, setRegisterForm } = useSignUpStore();
  const [phoneError, setPhoneError] = useState<string | undefined>(undefined);

  const handleChangePhone = (phone_number: string) => {
    setRegisterForm({ ...registerForm, phone_number });

    const result = phoneNumberSchema.safeParse(phone_number);
    setPhoneError(result.success ? undefined : result.error.errors[0]?.message);
  };

  return (
    <Input
      placeholder="Telefone"
      icon="phone"
      value={registerForm.phone_number}
      onChangeText={handleChangePhone}
      error={phoneError}
    />
  );
}
