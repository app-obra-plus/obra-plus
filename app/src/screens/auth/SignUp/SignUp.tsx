import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useEffect } from "react";
import SignUpNavigationWrapper from "./SignUpNavigationWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text } from "react-native";

const Stack = createNativeStackNavigator()

export default function SignUp() {
  return <SignUpNavigationWrapper />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22
  }
});