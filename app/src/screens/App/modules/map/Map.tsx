import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import MapComponent from "../../../../components/MapComponent";


export default function MapScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [regionInfo, setRegionInfo] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 0,
  });


  const calculateZoom = (latitudeDelta: number): number => {
    return Math.log2(360 / latitudeDelta);
  };


  return (
    <View style={{flex: 1}}>
    <MapComponent/>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          // backgroundColor: colors.CARD,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <View style={{
            width: 300,
            backgroundColor: 'white',
            transform: [{ translateY: 70 }],
            padding: 20,
            borderRadius: 10
          }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
              Marcador Selecionado
            </Text>
            <Text>
              Latitude: {selectedMarker?.latitude.toFixed(5)}
            </Text>
            <Text>
              Longitude: {selectedMarker?.longitude.toFixed(5)}
            </Text>
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
  </View>
  )

}

