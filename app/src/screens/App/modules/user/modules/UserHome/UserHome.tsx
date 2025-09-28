import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserProfileHeader } from "./UserProfileHeader";
import ButtonNavMenu from "../../ButtonNavMenu";
import { ScrollView, View } from "react-native";
import { useAuthStore } from "../../../../../../stores/useAuthStore";
import { useNavigation } from "@react-navigation/native";
import Button from "../../../../../../components/Button";

export default function UserHome() {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView edges={["top", "left", "right"]} >
      <UserProfileHeader />
      <ScrollView className="px-container">
        <View className="h-12" />
      </ScrollView>
    </SafeAreaView>
  );
}

