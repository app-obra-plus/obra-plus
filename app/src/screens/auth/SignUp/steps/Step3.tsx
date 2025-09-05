import { useState } from "react";
import Input from "../../../../components/AuthFormComponents/Input";
import { useSignUpStore } from "../store/useSignUpStore";
import { firstNameSchema, lastNameSchema } from "../../../../schemas/signUpSchema";
import InputText from "../../../../components/Input";

export default function Step3() {
  const { registerForm, setRegisterForm } = useSignUpStore();

  const [firstNameError, setFirstNameError] = useState<string | undefined>(undefined);
  const [lastNameError, setLastNameError] = useState<string | undefined>(undefined);

  const handleChangeFirstName = (first_name: string) => {
    setRegisterForm({ ...registerForm, first_name });

    const result = firstNameSchema.safeParse(first_name);
    setFirstNameError(result.success ? undefined : result.error.errors[0]?.message);
  };

  const handleChangeLastName = (last_name: string) => {
    setRegisterForm({ ...registerForm, last_name });

    const result = lastNameSchema.safeParse(last_name);
    setLastNameError(result.success ? undefined : result.error.errors[0]?.message);
  };

  return (
    <>
      <InputText
        placeholder="José"
        label="Nome"
        value={registerForm.first_name}
        onChange={handleChangeFirstName}
        autoCapitalize="words"
        // error={firstNameError}
      />
      <InputText
        placeholder="da Silva"
        label="Sobrenome"
        value={registerForm.last_name}
        onChange={handleChangeLastName}
        autoCapitalize="words"
        // error={lastNameError}
      />
    </>
  );
}
