import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator();

import React from "react";
import EditProfile from "./modules/EditProfile/EditProfile";
import UserHome from "./modules/UserHome/UserHome";
import AddressRouter from "./modules/Address/Address.routes";
import HeaderBackground from "../../../../components/HeaderBackground";
import { colors } from "../../../../theme/colors";
import { CustomDrawerContent } from "./CustomDrawerContent";

export default function UserConfigRouter() {
  return (
    <Drawer.Navigator 
      screenOptions={{
        headerShown: true, 
        headerBackground: () => <HeaderBackground />,
        headerTintColor: colors.white,
        drawerActiveBackgroundColor: colors.primary,
        drawerActiveTintColor: colors.white,
        drawerInactiveTintColor: colors.white,
        drawerStyle: { backgroundColor: colors.support},
        drawerItemStyle: { borderRadius: 4 },
        
        headerTitleAlign: 'center',
        drawerLabelStyle: { fontSize: 15 },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="homeProfile"
        component={UserHome}
        options={{
          title: "Perfil",
        }}
      />
      <Drawer.Screen
        name="editProfile"
        component={EditProfile}
        options={{
          title: "Meu perfil",
        }}
      />
      <Drawer.Screen
        name="address"
        component={AddressRouter}
        options={{
          title: "Endereços",
        }}
      />
    </Drawer.Navigator>
  )
}
