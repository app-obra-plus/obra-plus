import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import TextInput from "../../../../../../components/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../../../../../stores/useAuthStore";
import { UserProfileHeader } from "../UserHome/UserProfileHeader";
import Button from "../../../../../../components/Button";

export default function EditProfile() {
  const { user } = useAuthStore();

  const profilePictureUrl = user?.profile_picture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcm5WldpI23UcsikhxKoz_ZpcyDS19ryItSw&s";

  return (
    <SafeAreaView edges={["top", "left", "right"]} className="p-4">
      <ScrollView>
        <View className="mb-4 flex-row items-center">
          <Image
            source={{ uri: profilePictureUrl }}
            className="w-24 h-24 rounded-full"
          />
          <TouchableOpacity className="ml-4">
            <Text className="text-blue-500">Alterar foto de perfil</Text>
          </TouchableOpacity>
        </View>

        <TextInput 
          label="Nome"
          placeholder="Digite seu nome"
          value={user?.first_name || ""} 
          onChange={() => {}} 
        />
        <TextInput 
          label="Sobrenome"
          placeholder="Digite seu sobrenome"
          value={user?.last_name || ""} 
          onChange={() => {}} 
        />
        <TextInput 
          label="Email"
          placeholder="Digite seu email"
          value={user?.email || ""} 
          onChange={() => {}} 
        />
        <TextInput
          label="Telefone"
          placeholder="Digite seu telefone"
          value={user?.phone_number || ""}
          onChange={() => {}} 
        />

        <Button 
          text="Salvar"
        />
      </ScrollView>
    </SafeAreaView>
  )
}
