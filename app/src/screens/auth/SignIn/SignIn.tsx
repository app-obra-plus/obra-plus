import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView, Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import Input from "../../../components/AuthFormComponents/Input";
import StepWrapper from "../SignUp/StepWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../../styles/style";
import Button from "../../../components/AuthFormComponents/Button";
import React, { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";

interface SignInProps {
  children?: React.ReactNode;
  title: string;
  isValid?: boolean;
}

export default function SignIn({children}: SignInProps) {
  const {login} = useAuth()
  const {navigate} = useNavigation()
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [isValid, setIsValid] = React.useState<boolean>(!!email || !!password);

  const handleLogin = () => {
    login(email, password)
      .then(() => {
        navigate("app");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  }

  useEffect(() => {
    const validateForm = () => {
      setIsValid(!!email && !!password);
    };

    validateForm();
  }, [email, password]);

  return (
    <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.wrapper}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.inputWrapper}>
          <View style={styles.header}>
            {/* {ratio !== undefined && <WizzardProgress ratio={ratio} />} */}
            <Text style={styles.headerTitle}>{"Entre na sua conta"}</Text>
          </View>

          <View style={styles.inputsContainer}>
            <Input
              icon="mail"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              icon="lock"
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Button
              title={"Entrar"}
              onPress={handleLogin}
              rightIcon="chevron-right"
              disabled={!isValid}
            />
          </View>
            <Text style={styles.signInText}>
            Não tenho uma conta.{" "}
              <Text
                style={styles.signInLink}
                onPress={() => {
                  navigate("auth", {
                    screen: "signup"
                  })
                }}
              >
                Entrar.
              </Text>
            </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
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