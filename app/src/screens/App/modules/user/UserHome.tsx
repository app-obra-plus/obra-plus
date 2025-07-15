import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserProfileHeader } from "./UserProfileHeader";
import ButtonNavMenu from "./ButtonNavMenu";
import { ScrollView } from "react-native";

export default function UserHome() {
  return (
    <SafeAreaView edges={["top", "left", "right"]} >
      <UserProfileHeader />
      <ScrollView className="px-container">
        <ButtonNavMenu title="Editar perfil" icon="edit" />
        <ButtonNavMenu title="Sair" icon="log-out" type="danger" />
      </ScrollView>
    </SafeAreaView>
  );
}

