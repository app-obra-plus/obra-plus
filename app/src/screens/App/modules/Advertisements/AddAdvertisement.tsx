import React, { useCallback } from "react";
import MultiImageInput from "../../../../components/MultipleImageInput";
import Container from "../../../../components/Container";
import AdvertisementForm from "./AdvertisementForm";
import { ScrollView, Text } from "react-native";
import { advertisementMdl } from "../../../../api/advertisement/advertisementMdl";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { CreateAdvertisementDto } from "../../../../api/advertisement/advertisementSch";

export default function AddAdvertisement() {
  const [images, setImages] = React.useState<string[]>([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = React.useState(false);

  useFocusEffect(
    useCallback(() => {
      setImages([]);
    }, [])
  );
  

  const handleSubmit = (data: CreateAdvertisementDto) => {
    setIsLoading(true)
    console.log(data)
    async function uploadAdvertisement() {
      const response = await advertisementMdl.create(data).then(res => res.data)
      await advertisementMdl.uploadImages(response.id, images)
      navigation.goBack()
    }
    uploadAdvertisement().finally(() => setIsLoading(false))
  }

  return (
    <ScrollView>
      <Container>
        <Text className="text-2xl font-bold">Adicionar um novo anúncio</Text>
        <MultiImageInput onChange={setImages} />
        <AdvertisementForm onSubmit={handleSubmit} isLoading={isLoading}/>
      </Container>
    </ScrollView>
  )
}
