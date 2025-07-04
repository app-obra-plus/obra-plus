import React, { useEffect } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WizzardProgress from "./WizzardProgress";
import colors from "../../../styles/style";
import { steps } from "./SignUpNavigationWrapper";
import Button from "../../../components/AuthFormComponents/Button";
import { useNavigation } from "@react-navigation/native";
import { useSignUpStore } from "./store/useSignUpStore";

interface StepWrapperProps {
  children?: React.ReactNode;
  title: string;
  isValid?: boolean;
}

export default function StepWrapper({ children, title, isValid }: StepWrapperProps) {
  const navigation = useNavigation();
  const { currentStep, setCurrentStep, registerForm } = useSignUpStore();
  const [ratio, setRatio] = React.useState<number | undefined>(undefined);

  const nextStep = steps[currentStep + 1]?.name || null;

  useEffect(() => {
    console.log(currentStep)
    const numberOfSteps = steps.length
    setRatio(numberOfSteps > 0 ? (currentStep + 1) / numberOfSteps : undefined);
  }, [currentStep]);

  const handleNextStep = () => {
    if (nextStep) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log(registerForm)
    }
    
  };
  
  const handleGoBack = () => {
    setCurrentStep(currentStep - 1);
  }

  return (
    <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.wrapper}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.inputWrapper}>
          <View style={styles.header}>
            {ratio !== undefined && <WizzardProgress ratio={ratio} />}
            <Text style={styles.headerTitle}>{title}</Text>
          </View>

          <View style={styles.inputsContainer}>
            {children}
            <Button
              title={ratio === 1 ? "Finalizar" : "Próximo"}
              onPress={handleNextStep}
              rightIcon="chevron-right"
              disabled={!isValid}
            />
            {
              currentStep !== 0 && (
                <Button
                  title="Voltar"
                  onPress={handleGoBack}
                  variant="secondary"
                  leftIcon="chevron-left"
                />
              )
            }
          </View>
            <Text style={styles.signInText}>
            Já tenho uma conta.{" "}
              <Text
                style={styles.signInLink}
                onPress={() => {
                  navigation.navigate("auth", {
                    screen: "signin"
                  })
                }}
              >
                Entrar.
              </Text>
            </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    padding: colors.CONTAINER_PADDING,
    // justifyContent: "center",
    marginTop: 64,
    gap: 20,
  },
  inputWrapper: {
    gap: 24,
  },
  header: {
    gap: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  inputsContainer: {
    gap: 16,
  },
  error: {
    color: colors.ERROR,
    fontSize: 14,
    marginTop: 8,
  },
  signInLink: {
    color: colors.PRIMARY,
    textDecorationLine: "underline",
  },
  signInText: {
    fontSize: 18,
    textAlign: "center",
  }
});

