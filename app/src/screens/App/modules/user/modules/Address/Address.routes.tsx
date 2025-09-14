import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddressList from "./AddressList";
import AddAddressMap from "./AddAddressMap";
import AddAddressForm from "./AddAddressForm";
import { AddressUpdate } from "../../../../../../api/address/addressSch";

export type AddressStackParamList = {
  listAddress: undefined;
  addAddressMap: undefined;
  addAddressForm: {
    address: AddressUpdate | null;
  };
};

const Stack = createNativeStackNavigator<AddressStackParamList>();


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
        name="addAddressMap"
        component={AddAddressMap}
      />
      <Stack.Screen
        name="addAddressForm"
        component={AddAddressForm}
      />
    </Stack.Navigator>
  )
}