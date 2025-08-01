import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserProfileHeader } from "./UserProfileHeader";
import ButtonNavMenu from "./ButtonNavMenu";
import { ScrollView, View } from "react-native";
import { useAuthStore } from "../../../../stores/useAuthStore";

export default function UserHome() {
  const { signOut } = useAuthStore();

  return (
    <SafeAreaView edges={["top", "left", "right"]} >
      <UserProfileHeader />
      <ScrollView className="px-container">
        <ButtonNavMenu title="Editar perfil" icon="edit" />
        <ButtonNavMenu title="Meus endereços" icon="map-pin" />
        <ButtonNavMenu title="Meus anúncios" icon="file-text" />
        <View className="h-12" />
        <ButtonNavMenu title="Sair" icon="log-out" type="danger" onPress={signOut} />
      </ScrollView>
    </SafeAreaView>
  );
}

