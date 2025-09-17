import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import ListAdvertisements from "./ListAdvertisements";
import { AddAdvertisementScreen } from "../../telas-mockadas";
import AddAdvertisement from "./AddAdvertisement";

const Stack = createNativeStackNavigator();


export default function AdvertisementsConfigRouter() {
  return (
    <Stack.Navigator
      initialRouteName="listAdvertisements"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="listAdvertisements"
        component={ListAdvertisements}
      />
      <Stack.Screen
        name="addAdvertisement"
        component={AddAdvertisement}
      />
    </Stack.Navigator>
  )
}