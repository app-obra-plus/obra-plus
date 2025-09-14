import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import AddressListCard from "./AddressListCard";
import { useNavigation } from "@react-navigation/native";
import { RenderList } from "../../../../../../components/RenderList";

export default function AddressList() {
  const { navigate } = useNavigation();

  const handleAddAddressPress = () => {
    navigate("addAddressMap" as never);
  }

  // const { data: addresses = [], isLoading } = useQuery(
  //   [],
  //   () => address
  // )

  const addresses = ["Endereço 1", "Endereço 2", "Endereço 3"];

  return (
    <SafeAreaView edges={["left", "right"]} className="h-full">
      <ScrollView className="pt-4 h-full">
        <RenderList<string>
          data={addresses}
          loading={true}
        >
          {(item) => (
            <Text>{item}</Text>
          )}
        </RenderList>
      </ScrollView>
      <TouchableOpacity className="absolute bottom-0 right-0 m-4 p-4 bg-primary rounded-full shadow" onPress={handleAddAddressPress}>
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
