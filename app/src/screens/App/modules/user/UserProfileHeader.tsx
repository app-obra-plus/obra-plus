import { Button, Image, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useAuth } from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";

export function UserProfileHeader() {
  const { getUser, signOut } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      console.log("User data fetched:", userData);
      setUser(userData);
    };
    fetchUser();
  }, []);

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
      >Fulano de Tal</Text>
    </View>
  );
}