import { Image, Text, View } from "react-native";
import { useAuthStore } from "../../../../stores/useAuthStore";

export function UserProfileHeader() {
  const { user, signOut } = useAuthStore();

  const profilePictureUrl = user?.profile_picture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcm5WldpI23UcsikhxKoz_ZpcyDS19ryItSw&s";

  return (
    <View className="flex items-center py-16">
      <View className="relative">
        <Image
          source={{ uri: profilePictureUrl }}
          className="w-36 h-36 rounded-full"
        />
      </View>
      <Text
        className="text-2xl font-bold mt-4"
      >{user?.first_name} {user?.last_name}</Text>
    </View>
  );
}