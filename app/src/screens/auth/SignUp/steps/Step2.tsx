import { useEffect, useState } from "react";
import Input from "../../../../components/AuthFormComponents/Input";
import { useSignUpStore } from "../store/useSignUpStore";
import { StepProps } from "./StepProps";
import { passwordSchema } from "../../../../schemas/signUpSchema";
import { confirmPasswordSchema } from "../../../../schemas/signUpSchema";

export default function Step2({setIsValid}: StepProps) {
  const { registerForm, setRegisterForm } = useSignUpStore();
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | undefined>(undefined);


  const handleChangePassword = (password: string) => {
    setRegisterForm({ ...registerForm, password });

    const result = passwordSchema.safeParse(password);
    setPasswordError(result.success ? undefined : result.error.errors[0]?.message);
    setIsValid(result.success);
  };

  const handleChangeConfirmPassword = (confirm_password: string) => {
    setRegisterForm({ ...registerForm, confirm_password });
  };

  useEffect(() => {
    const { password, confirm_password } = registerForm;

    if (password && confirm_password) {
      const isMatch = password === confirm_password;

      setConfirmPasswordError(isMatch ? undefined : "As senhas não coincidem");
      setIsValid(isMatch);
    } else {
      setIsValid(false);
    }
  }, [registerForm.password, registerForm.confirm_password]);


  return (
    <>
      <Input
        placeholder="Senha"
        icon="lock"
        value={registerForm.password}
        onChangeText={handleChangePassword}
        error={passwordError}
        secureTextEntry
      />
      <Input
        placeholder="Confirme sua senha"
        icon="lock"
        value={registerForm.confirm_password}
        onChangeText={handleChangeConfirmPassword}
        error={confirmPasswordError}
        secureTextEntry
      />
    </>
  );
}