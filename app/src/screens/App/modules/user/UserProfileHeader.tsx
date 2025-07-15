import { Button, Image, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useAuthStore } from "../../../../stores/useAuthStore";

export function UserProfileHeader() {
  const { user, signOut } = useAuthStore();

  return (
    <View className="flex items-center py-16">
      <View className="relative">
        <Image
          source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcm5WldpI23UcsikhxKoz_ZpcyDS19ryItSw&s" }}
          className="w-36 h-36 rounded-full"
        />
        <Feather
          className="absolute bottom-0 right-0 bg-primary color-white rounded-full p-2"
          size={18}
          name="edit"
          color="white"
        />
      </View>
      <Text
        className="text-2xl font-bold mt-4"
      >{user?.first_name}</Text>
    </View>
  );
}