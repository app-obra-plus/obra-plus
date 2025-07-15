import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserProfileHeader } from "./UserProfileHeader";
import ButtonNavMenu from "./ButtonNavMenu";
import { ScrollView } from "react-native";
import { useAuthStore } from "../../../../stores/useAuthStore";

export default function UserHome() {
  const { signOut } = useAuthStore();

  return (
    <SafeAreaView edges={["top", "left", "right"]} >
      <UserProfileHeader />
      <ScrollView className="px-container">
        <ButtonNavMenu title="Editar perfil" icon="edit" />
        <ButtonNavMenu title="Sair" icon="log-out" type="danger" onPress={signOut} />
      </ScrollView>
    </SafeAreaView>
  );
}

