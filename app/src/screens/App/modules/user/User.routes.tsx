import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator()

import React from "react";
import EditProfile from "./modules/EditProfile/EditProfile";
import UserHome from "./UserHome";
import { useNavigation } from "@react-navigation/native";
import AddressList from "./modules/Address/AddressList";
import AddressRouter from "./modules/Address/Address.routes";

export default function UserConfigRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={UserHome}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="editProfile"
        component={EditProfile}
        options={{
          title: "Editar perfil",
        }}
      />
      <Stack.Screen
        name="address"
        component={AddressRouter}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}
