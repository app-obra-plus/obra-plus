import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "./SearchScreen";
import AdvertisementScreen from "../Advertisements/advertisementScreen/AdvertisementScreen";

export type SearchStackParamList = {
  advertisementList: undefined;
  advertisementDetails: { advertisementId: string };
};

const Stack = createNativeStackNavigator<SearchStackParamList>();

export default function SearchConfigRouter() {
  return (
    <Stack.Navigator
      initialRouteName="advertisementList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="advertisementList"
        component={SearchScreen}
      />
      <Stack.Screen
        name="advertisementDetails"
        component={AdvertisementScreen}
      />
    </Stack.Navigator>  
  )
}
