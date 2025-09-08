import { useNavigation } from "@react-navigation/native";
import { Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import StepWrapper from "../SignUp/StepWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../../styles/style";
import React, { useEffect } from "react";
import { useAuthStore } from "../../../stores/useAuthStore";
import InputText from "../../../components/Input";
import Button from "../../../components/Button";
import { useToast } from "../../../components/Toast/useToast";

const Logo = require("../../../../assets/logo/branca.png")

export default function SignIn() {
  const { showToast } = useToast()
  const navigation = useNavigation()
  const { login } = useAuthStore();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [isValid, setIsValid] = React.useState<boolean>(!!email || !!password);

  const handleLogin = () => {
    console.log("tentando")
    login(email, password)
      .then(() => {
        navigation.navigate("app" as never);
      })
      .catch((error) => {
        showToast("Erro ao fazer login. Verifique os dados e tente novamente.", "error");
        // console.error("Login failed:", error);
      });
  }

  useEffect(() => {
    const validateForm = () => {
      setIsValid(!!email && !!password);
    };

    validateForm();
  }, [email, password]);

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }} className="bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        className="h-screen"
      >
        <StatusBar barStyle="light-content" />
        <View className="bg-support items-center py-12 pt-16 rounded-b">
          <Image source={Logo} className="scale-[0.6]"/>
        </View>
        <View className="justify-between px-4 flex-1">
          <View className="gap-4 py-10">
            <Text
              className="text-center text-2xl mb-4 text-support"
            >Acesse sua conta</Text>
            <InputText
              label="Email"
              placeholder="email@example.com"
              value={email}
              onChange={setEmail}
            />
            <InputText
              label="Senha"
              placeholder="***********"
              secure
              value={password}
              onChange={setPassword}
            />
          </View>
          <View 
            className="py-8 gap-6"
          >
            <Button
              text="Entrar"
              type="primary"
              onPress={handleLogin}
              disabled={!isValid}
            />
            <Button
              text="Ainda não tenho uma conta"
              type="link"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
