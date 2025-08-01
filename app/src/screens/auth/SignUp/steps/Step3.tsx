import { useState } from "react";
import Input from "../../../../components/AuthFormComponents/Input";
import { useSignUpStore } from "../store/useSignUpStore";
import { firstNameSchema, lastNameSchema } from "../../../../schemas/signUpSchema";

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
      <Input
        placeholder="Nome"
        icon="user"
        value={registerForm.first_name}
        onChangeText={handleChangeFirstName}
        error={firstNameError}
      />
      <Input
        placeholder="Sobrenome"
        icon="user"
        value={registerForm.last_name}
        onChangeText={handleChangeLastName}
        error={lastNameError}
      />
    </>
  );
}
