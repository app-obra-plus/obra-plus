import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import BottomSelect from "../../../../components/BottomSelect";
import InputText from "../../../../components/Input";
import { CreateAdvertisementDto, CreateAdvertisementSchema, optionsUnitOfMeasure, UnitOfMeasure } from "../../../../api/advertisement/advertisementSch";
import { Controller, useForm } from "react-hook-form";
import ToggleButton from "../../../../components/ToggleButton";
import { useQuery } from "@tanstack/react-query";
import categoryMdl from "../../../../api/caregory/categoryMdl";
import { addressMdl } from "../../../../api/address/addressMdl";
import { useAuthStore } from "../../../../stores/useAuthStore";
import Button from "../../../../components/Button";
import { useFocusEffect } from "@react-navigation/native";
import { zodResolver } from "@hookform/resolvers/zod";

interface IAdvertisementForm {
  onSubmit: (data: CreateAdvertisementDto) => void;
  isLoading: boolean;
}

export default function AdvertisementForm({ onSubmit, isLoading }: IAdvertisementForm) {
  const {user} = useAuthStore()

  const { control, handleSubmit, reset, formState: { isValid, errors } } = useForm<CreateAdvertisementDto>({
    resolver: zodResolver(CreateAdvertisementSchema),
    defaultValues: {
      isDonation: false,
      amount: 0,
      price: 0,
    },
  })

  useFocusEffect(
    useCallback(() => {
      reset()
    }, [])
  );

  useEffect(() => {
    console.log(errors)
  }, [errors, isValid])


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

  const submit = (data: CreateAdvertisementDto) => {
    console.log(data)
    onSubmit(data)
  }

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
            error={errors.title?.message}
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
            error={errors.description?.message}
          />
        )}
      />
      <View className="flex flex-row gap-4">
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, value } }) => (
            <InputText
              label="Quantidade"
              value={value?.toString()}
              keyboardType="numeric"
              className="w-1/2"
              onChange={value => value === undefined ? onChange(undefined) : onChange(Number(value))}
              error={errors.amount?.message}
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
              className="flex-1"
              label="Unidade de medida"
              onChange={onChange}
              placeholder="Selecione"
              error={errors.unitOfMeasure?.message}
              getLabel={(val) => optionsUnitOfMeasure.find(o => o.value === val)?.label || "" }
            />
          )}
        />
      </View>
      
      <View className="flex flex-row gap-4">
        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <InputText
              label="Preço"
              mask={{ 
                type: 'currency', 
                options: { prefix: 'R$ ', decimalSeparator: ',', groupSeparator: '.', precision: 2 } 
              }}
              value={value?.toString()}
              keyboardType="numeric"
              className="w-1/2"
              onChange={value => onChange(Number(value))}
              error={errors.price?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="isDonation"
          render={({ field: { onChange, value } }) => (
            <ToggleButton
              label="É doação?"
              className="flex-1"
              value={value}
              onChange={onChange}
            />
          )}
        />
      </View>
      <Controller
        control={control}
        name="category_id"
        render={({ field: { onChange, value } }) => (
          <BottomSelect<string>
            options={categories.map(c => ({ label: c.name, value: c.id }))}
            value={value || undefined}
            label="Categoria"
            onChange={onChange}
            placeholder="Selecione"
            getLabel={(val) => categories.find(c => c.id === val)?.name || ""}
            error={errors.category_id?.message}
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
            placeholder="Selecione"
            getLabel={(val) => {
              const name = enderecos.find(c => c.id === val)?.number + ", " + enderecos.find(c => c.id === val)?.street
              return name || ""
            }}
            error={errors.addressId?.message}
          />
        )}
      />
      <View className="my-4">
        <Button text="Salvar" onPress={handleSubmit(submit)} isLoading={isLoading} />
      </View>

    </View>
  )
}
