import { View} from "react-native";
import Button from "../../../../../../components/Button";
import Feather from "@expo/vector-icons/Feather";
import MapComponent from "../../../../../../components/MapComponent";


export default function AddAddress() {
  return (
    <View className="h-full">
      <MapComponent />
      <Feather name="map-pin" size={24} color="black" className="absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[-100%]" />
      <View className="absolute bottom-0 w-full p-4 gap-4 pb-10">
        <Button text="Avançar"/>
        <Button text="Voltar" type="outline" onPress={() => {}}/>
      </View>
    </View>
  );
}