import React, { useCallback } from "react";
import { View } from "react-native";
import BottomSelect from "../../../../components/BottomSelect";
import InputText from "../../../../components/Input";
import { CreateAdvertisementDto, optionsUnitOfMeasure, UnitOfMeasure } from "../../../../api/addvertisement/addvertisementSch";
import { Controller, useForm } from "react-hook-form";
import ToggleButton from "../../../../components/ToggleButton";
import { useQuery } from "@tanstack/react-query";
import categoryMdl from "../../../../api/caregory/categoryMdl";
import { addressMdl } from "../../../../api/address/addressMdl";
import { useAuthStore } from "../../../../stores/useAuthStore";
import Button from "../../../../components/Button";
import { useFocusEffect } from "@react-navigation/native";

interface IAdvertisementForm {
  onSubmit: (data: CreateAdvertisementDto) => void;
}

export default function AdvertisementForm({ onSubmit }: IAdvertisementForm) {
  const {user} = useAuthStore()

  const { control, handleSubmit, reset } = useForm<CreateAdvertisementDto>({
    defaultValues: {}
  })

  useFocusEffect(
    useCallback(() => {
      reset()
    }, [])
  );

  

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryMdl.getAll(),
    select: (data) => data.data
  })

  const { data: enderecos = [] } = useQuery({
    queryKey: ['enderecos'],
    queryFn: () => addressMdl.listByUserId(1, 1000, user?.id || ""),
    select: (data) => data.data.data
  })

  return (
    <View className="mt-8">
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <InputText
            label="Título"
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <InputText
            label="Descrição"
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="unitOfMeasure"
        render={({ field: { onChange, value } }) => (
          <BottomSelect<UnitOfMeasure>
            options={optionsUnitOfMeasure}
            value={value}
            label="Unidade de medida"
            onChange={onChange}
            placeholder="Selecione uma opção"
            getLabel={(val) => optionsUnitOfMeasure.find(o => o.value === val)?.label || "" }
          />
        )}
      />
      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, value } }) => (
          <InputText
            label="Quantidade"
            value={value?.toString()}
            keyboardType="numeric"
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="price"
        render={({ field: { onChange, value } }) => (
          <InputText
            label="Preço"
            value={value?.toString()}
            keyboardType="numeric"
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="isDonation"
        render={({ field: { onChange, value } }) => (
          <ToggleButton
            label="É doação?"
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="category_id"
        render={({ field: { onChange, value } }) => (
          <BottomSelect<string>
            options={categories.map(c => ({ label: c.name, value: c.id }))}
            value={value || undefined}
            label="Categoria"
            onChange={onChange}
            placeholder="Selecione uma opção"
            getLabel={(val) => categories.find(c => c.id === val)?.name || ""}
          />
        )}
      />
      <Controller
        control={control}
        name="addressId"
        render={({ field: { onChange, value } }) => (
          <BottomSelect<string>
            options={enderecos.map(e => ({ label: e.number + ", " + e.street, value: e.id }))}
            value={value || undefined}
            label="Endereço"
            onChange={onChange}
            placeholder="Selecione uma opção"
            getLabel={(val) => {
              const name = enderecos.find(c => c.id === val)?.number + ", " + enderecos.find(c => c.id === val)?.street
              return name || ""
            }}
          />
        )}
      />
      <View className="my-4">
        <Button text="Salvar" onPress={handleSubmit(onSubmit)} />
      </View>

    </View>
  )
}
