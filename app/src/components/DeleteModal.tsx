import React from "react";
import { Modal, Text, View } from "react-native";
import Button from "./Button";

export default function DeleteModal() {
  return (
    <Modal>
      <View>
        <Text>Tem certeza que deseja deletar este item?</Text>
        <View>
          <Button text="Deletar" onPress={() => {}} />
          <Button text="Cancelar" onPress={() => {}} />
        </View>
      </View> 
    </Modal>
  )
}
