import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator()

import React from "react";
import Step1 from "./Step1";

export default function SignUpNavigationWrapper() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="first_step"
        component={Step1}
      />
    </Stack.Navigator>
  )
}
