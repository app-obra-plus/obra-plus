import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import AddressListCard from "./AddressListCard";
import { useNavigation } from "@react-navigation/native";

export default function AddressList() {
  const { navigate } = useNavigation();

  const handleAddAddressPress = () => {
    navigate("addAddress");
  }

  return (
    <SafeAreaView edges={["left", "right"]} className="h-full">
      <ScrollView className="pt-4">
        <View className="px-4">
          <AddressListCard />
          <AddressListCard />
          <AddressListCard />
          <AddressListCard />
          <AddressListCard />
          <AddressListCard />
          <AddressListCard />
          <AddressListCard />
          <AddressListCard />
          <AddressListCard />
          <AddressListCard />
          <AddressListCard />
          <AddressListCard />
          <AddressListCard />
        </View>
      </ScrollView>
      <TouchableOpacity className="absolute bottom-0 right-0 m-4 p-4 bg-primary rounded-full shadow" onPress={handleAddAddressPress}>
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
