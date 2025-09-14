import React from "react";
import { ScrollView, Text, View } from "react-native";
import Button from "../../../../../../components/Button";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AddressStackParamList } from "./Address.routes";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputText from "../../../../../../components/Input";
import { CreateAddressDto, CreateAddressSchema } from "../../../../../../api/address/addressSch";
import { addressMdl } from "../../../../../../api/address/addressMdl";

type AddAddressFormRouteProp = RouteProp<AddressStackParamList, "addAddressForm">;


export default function AddAddressForm() {
  const route = useRoute<AddAddressFormRouteProp>();
  const navigation = useNavigation();

  const { address } = route.params;

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<CreateAddressDto>({
    resolver: zodResolver(CreateAddressSchema),
    defaultValues: { ...address } as CreateAddressDto,
    mode: "onChange"
  });

  const onSubmit = (data: CreateAddressDto) => {
    addressMdl.create(data).then(() => {
      console.log("Foi")
      navigation.navigate("addressList" as never);
    }).catch((err) => {
      console.log(err)
    });
  }


  return (
    <View>
      <ScrollView className="h-full">
        <View className="p-4">

          <Controller
            control={control}
            name="country"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="País"
                error={errors.country?.message}
                label="País"
              />
            )}
          />
          
          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Cidade"
                label="Cidade"
                error={errors.street?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="neighborhood"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Bairro"
                error={errors.neighborhood?.message}
                label="Bairro"
              />
            )}
          />
          
          <Controller
            control={control}
            name="street"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Rua"
                label="Rua"
                error={errors.street?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="number"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Número"
                label="Número"
                error={errors.number?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="complement"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Complemento"
                label="Complemento"
                error={errors.complement?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="postal_code"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="CEP"
                label="CEP"
                error={errors.postal_code?.message}
              />
            )}
          />
        </View>
        <View className="w-full p-4 gap-4 pb-10">
          <Button text="Salvar Endereço" onPress={handleSubmit(onSubmit)} disabled={!isValid} />
          <Button text="Voltar ao Mapa" type="outline" bgFill onPress={navigation.goBack} />
        </View>
      </ScrollView>
      
    </View>
  )
}
