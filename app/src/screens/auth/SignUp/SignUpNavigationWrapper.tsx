import React, { useEffect, useState } from "react";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import { useSignUpStore } from "./store/useSignUpStore";
import StepWrapper from "./StepWrapper";
import { BackHandler } from "react-native";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";

export const steps = [
  {
    name: "first_step",
    component: Step1,
    title: "Informe seu email",
  },
  {
    name: "second_step",
    component: Step2,
    title: "Escolha sua senha",
  },
  {
    name: "third_step",
    component: Step3,
    title: "Informe seu nome",
  },
  {
    name: "fourth_step",
    component: Step4,
    title: "Informe seu telefone",
  },
]

export default function SignUpNavigationWrapper() {
  const { currentStep, setCurrentStep } = useSignUpStore();
  const [atualStep, setAtualStep] = useState(steps[0]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setCurrentStep(0)
  }, []);

  useEffect(() => {
    setAtualStep(steps[currentStep]);
  }, [currentStep]);

  useEffect(() => {
    const onBackPress = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => subscription.remove();
  }, [currentStep, setCurrentStep]);

  return (
    <StepWrapper
      title={atualStep.title}
      isValid={isValid}
    >
      <atualStep.component setIsValid={setIsValid} />
    </StepWrapper>
  );
}
