import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddressList from "./AddressList";
import AddAddress from "./AddAddress";

const Stack = createNativeStackNavigator();

export default function AddressRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={AddressList}
        options={{
          title: "Meus endereços",
        }}
      />
      <Stack.Screen
        name="addAddress"
        component={AddAddress}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}