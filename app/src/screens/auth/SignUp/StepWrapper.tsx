import React, { useEffect } from "react";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WizzardProgress from "../../../components/AuthFormComponents/WizzardProgress";
import colors from "../../../styles/style";
import { steps } from "./SignUpNavigationWrapper";
import { useNavigation } from "@react-navigation/native";
import { useSignUpStore } from "./store/useSignUpStore";
import { useAuthStore } from "../../../stores/useAuthStore";
import Button from "../../../components/Button";
import { useToast } from "../../../components/Toast/useToast";
const Logo = require("../../../../assets/logo/branca.png")


interface StepWrapperProps {
  children?: React.ReactNode;
  title: string;
  isValid?: boolean;
}

export default function StepWrapper({ children, title, isValid }: StepWrapperProps) {
  const { showToast } = useToast();
  const { register } = useAuthStore();
  const navigation = useNavigation();
  const { currentStep, setCurrentStep, registerForm } = useSignUpStore();
  const [ratio, setRatio] = React.useState<number | undefined>(undefined);

  const nextStep = steps[currentStep + 1]?.name || null;

  useEffect(() => {
    const numberOfSteps = steps.length
    setRatio(numberOfSteps > 0 ? (currentStep + 1) / numberOfSteps : undefined);
  }, [currentStep]);

  const handleNextStep = () => {
    if (nextStep) {
      setCurrentStep(currentStep + 1);
    } else {
      register(registerForm)
        .then(() => {
          navigation.navigate("signin" as never);
        })
        .catch((error) => {
          showToast("Erro ao registrar usuário. Verifique os dados e tente novamente.", "error");
          console.error("Error during registration:", );
          console.error(error);
        });
    }
    
  };
  
  const handleGoBack = () => {
    if(currentStep == 0) {
      navigation.goBack();
      return;
    }
    setCurrentStep(currentStep - 1);
  }

  return (
    <SafeAreaView edges={[]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-between h-screen bg-background"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View className="flex-1">
          <View className="bg-support items-center py-12 pt-16 rounded-b">
            <Image source={Logo} className="scale-[0.6]"/>
          </View>

          <View className="gap-4 p-4 pb-8">
            <Text className="text-center text-2xl mb-4 text-support" >Crie sua conta</Text>
            {/* <Text className="text-2xl text-support text-center ">{title}</Text> */}
            {ratio !== undefined && <WizzardProgress ratio={ratio} />}
          </View>

          <View className="gap-4 flex-1 px-4 ">
            <View className="flex-1">
              {children}
            </View>
            <View className="py-8 gap-6">
              <Button
                text={ratio === 1 ? "Finalizar" : "Próximo"}
                onPress={handleNextStep}
                // rightIcon="chevron-right"
                disabled={!isValid}
              />
              <Button
                text="Voltar"
                onPress={handleGoBack}
                type="outline"
              />
              <Text className="text-center">
              Já tenho uma conta.{" "}
                <Text
                  className="text-primary"
                  onPress={() => navigation.navigate("signin" as never)}
                >
                  Entrar.
                </Text>
              </Text>

            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
