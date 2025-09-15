import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import AddressListCard from "./AddressListCard";
import { useNavigation } from "@react-navigation/native";
import { RenderList } from "../../../../../../components/RenderList";
import { addressMdl } from "../../../../../../api/address/addressMdl";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../../../../stores/useAuthStore";
import { AddressResponseDto } from "../../../../../../api/address/addressSch";
import InfiniteScrollList from "../../../../../../components/InfiniteScrollList";
import Container from "../../../../../../components/Container";

export default function AddressList() {
  const { navigate } = useNavigation();
  const { user } = useAuthStore();

  const handleAddAddressPress = () => {
    navigate("addAddressMap" as never);
  }

  return (
    <SafeAreaView edges={["left", "right"]} className="h-full">
      <Container>
        <InfiniteScrollList<AddressResponseDto>
          fetchFn={addressMdl.listByUserId.bind(addressMdl)} 
          keyExtractor={(item) => item.id.toString() + Math.random().toString()}
          params={[user?.id]}
          pageSize={10}  
        >
          {(item) => <AddressListCard address={item} />}
        </InfiniteScrollList>
      </Container>
      <TouchableOpacity className="absolute bottom-0 right-0 m-4 p-4 bg-primary rounded-full shadow" onPress={handleAddAddressPress}>
        <Feather name="plus" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
