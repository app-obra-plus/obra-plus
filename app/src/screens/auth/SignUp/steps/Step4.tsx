import { useState } from "react";
import Input from "../../../../components/AuthFormComponents/Input";
import { useSignUpStore } from "../store/useSignUpStore";
import { phoneNumberSchema } from "../../../../schemas/signUpSchema";
import InputText from "../../../../components/Input";

export default function Step4() {
  const { registerForm, setRegisterForm } = useSignUpStore();
  const [phoneError, setPhoneError] = useState<string | undefined>(undefined);

  const handleChangePhone = (phone_number: string) => {
    setRegisterForm({ ...registerForm, phone_number });

    const result = phoneNumberSchema.safeParse(phone_number);
    setPhoneError(result.success ? undefined : result.error.errors[0]?.message);
  };

  return (
    <InputText
      placeholder="Telefone"
      label="Telefone"
      value={registerForm.phone_number}
      onChange={handleChangePhone}
      keyboardType="phone-pad"
      // error={phoneError}
    />
  );
}
