import React, { useState } from "react";
import { View, Image, TouchableOpacity, FlatList, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableFlatList, {
  RenderItem,
  RenderItemParams,
} from "react-native-draggable-flatlist";


interface MultiImageInputProps {
  onChange?: (images: string[]) => void;
}

export default function MultiImageInput({ onChange }: MultiImageInputProps) {
  const [images, setImages] = useState<string[]>([]);

  async function pickImages() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      const newImages = [...images, ...uris];
      setImages(newImages);
      onChange?.(newImages);
    }
  }

  function removeImage(uri: string) {
    const filtered = images.filter((img) => img !== uri);
    setImages(filtered);
    onChange?.(filtered);
  }

  function renderItem({item}: {item: string}) {
    return (
      <View className="relative mr-2">
        <TouchableOpacity>
          <Image
            source={{ uri: item }}
            className="w-24 h-24 rounded-xl"
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="absolute top-1 right-1 bg-red-500 p-1 rounded-full"
          onPress={() => removeImage(item)}
        >
          <Feather name="trash-2" size={16} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <Text className="text-lg font-semibold mb-4">Fotos do item</Text>
      <View className="flex-row items-center">
        <FlatList
          data={images}
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item }) => renderItem({ item })}
          contentContainerStyle={{ paddingHorizontal: 8 }}
        />

        <TouchableOpacity
          className="w-24 h-24 bg-gray-200 rounded-xl justify-center items-center ml-2"
          onPress={pickImages}
        >
          <Feather name="plus" size={32} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
