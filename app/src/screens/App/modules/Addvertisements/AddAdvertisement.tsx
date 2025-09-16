import React, { useCallback } from "react";
import MultiImageInput from "../../../../components/MultipleImageInput";
import Container from "../../../../components/Container";
import AdvertisementForm from "./AdvertisementForm";
import { ScrollView } from "react-native";
import { CreateAdvertisementDto } from "../../../../api/addvertisement/addvertisementSch";
import { advertisementMdl } from "../../../../api/addvertisement/advertisementMdl";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function AddAdvertisement() {
  const [images, setImages] = React.useState<string[]>([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setImages([]);
    }, [])
  );
  

  const handleSubmit = (data: CreateAdvertisementDto) => {
    async function uploadAdvertisement() {
      const response = await advertisementMdl.create(data).then(res => res.data)
      const imageResponse = await advertisementMdl.uploadImages(response.id, images)
      navigation.goBack()
    }
    uploadAdvertisement();
  }

  return (
    <ScrollView>
      <Container>
        <MultiImageInput onChange={setImages} />
        <AdvertisementForm onSubmit={handleSubmit} />
      </Container>
    </ScrollView>
  )
}
