import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddressList from "./AddressList";
import AddAddress from "./AddAddress";

const Stack = createNativeStackNavigator();

export default function AddressRouter() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="listAddress"
        component={AddressList}
      />
      <Stack.Screen
        name="addAddress"
        component={AddAddress}
      />
    </Stack.Navigator>
  )
}