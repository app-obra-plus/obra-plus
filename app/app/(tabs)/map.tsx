import { View, Text } from "@/components/Themed";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Location from 'expo-location';
import MapView, { Marker } from "react-native-maps";
import { Button, Modal, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import mapStyleDark from '@/constants/mapStyleDark';


export default function Map() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
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

  useEffect(() => {
    console.log('Carregando localização...');
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log('Status da permissão:', status);
      if(status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })()
  }, [])

  if(!location) {
    return (
      <SafeAreaView>
        <Text>{errorMsg || 'Carregando localização...'}</Text>
      </SafeAreaView>
    );
  }


  const calculateZoom = (latitudeDelta: number): number => {
    return Math.log2(360 / latitudeDelta);
  };

  const handleRegionChangeComplete = (region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }) => {
    const zoomLevel = calculateZoom(region.latitudeDelta);
    console.log("🗺️ Nova região:", region);
    console.log("🔍 Nível de zoom aproximado:", zoomLevel.toFixed(2));

    setRegionInfo({
      latitude: region.latitude,
      longitude: region.longitude,
      zoom: zoomLevel,
    });
  };
  
  const gerarMarcadoresProximos = () => {
    console.log("Gerando marcadores próximos...");
    const marcadores =  [{"latitude": -19.86853049432029, "longitude": -43.2071512324426}, {"latitude": -19.85708810182439, "longitude": -43.212905080774334}, {"latitude": -19.836660999127194, "longitude": -43.180824216653264}, {"latitude": -19.785855219224167, "longitude": -43.154319341043774}, {"latitude": -19.854490406211948, "longitude": -43.17191751151438}, {"latitude": -19.829386290628424, "longitude": -43.21360435724707}, {"latitude": -19.831297558335066, "longitude": -43.20302741195941}, {"latitude": -19.81818917769212, "longitude": -43.18449027573273}, {"latitude": -19.866481660999597, "longitude": -43.13138715365732}, {"latitude": -19.829982278329403, "longitude": -43.19431685097082}, {"latitude": -19.861770405762922, "longitude": -43.16110450672967}, {"latitude": -19.795893355546244, "longitude": -43.14600414310411}, {"latitude": -19.83507112111204, "longitude": -43.13190877035723}, {"latitude": -19.820602627886412, "longitude": -43.22359107685747}, {"latitude": -19.826994508502906, "longitude": -43.19215300440958}, {"latitude": -19.880300804534087, "longitude": -43.14749991833371}, {"latitude": -19.860886456144947, "longitude": -43.15449990201866}, {"latitude": -19.82263423552865, "longitude": -43.16628918654227}, {"latitude": -19.83305403140927, "longitude": -43.17539234613654}, {"latitude": -19.8831559366386, "longitude": -43.153164451454344}, {"latitude": -19.87466215879503, "longitude": -43.17691499687233}, {"latitude": -19.873670376945615, "longitude": -43.16467801147818}, {"latitude": -19.8103134998772, "longitude": -43.18212697888936}, {"latitude": -19.84311835801598, "longitude": -43.1661538198847}, {"latitude": -19.802438699966185, "longitude": -43.2108247235006}, {"latitude": -19.788171892240232, "longitude": -43.153376030433506}, {"latitude": -19.857661532546434, "longitude": -43.206592756010004}, {"latitude": -19.84822901342506, "longitude": -43.22355632404651}, {"latitude": -19.850100355206532, "longitude": -43.19789283265445}, {"latitude": -19.788289953163908, "longitude": -43.20933359191373}, {"latitude": -19.797637294723522, "longitude": -43.22296842916205}, {"latitude": -19.813205665622377, "longitude": -43.14094865999441}, {"latitude": -19.846122790719757, "longitude": -43.20950678940757}, {"latitude": -19.837507939864352, "longitude": -43.18415668653756}, {"latitude": -19.863605267688683, "longitude": -43.15807417263002}, {"latitude": -19.847088457972873, "longitude": -43.131567198459784}, {"latitude": -19.87393543988303, "longitude": -43.21959371132726}, {"latitude": -19.83572693803398, "longitude": -43.152863856574776}, {"latitude": -19.803140372852972, "longitude": -43.1693699151733}, {"latitude": -19.83402707922679, "longitude": -43.2203616449536}, {"latitude": -19.832224810240728, "longitude": -43.19317163372246}, {"latitude": -19.816195288349334, "longitude": -43.17566574806603}, {"latitude": -19.79084654286749, "longitude": -43.17064697839993}, {"latitude": -19.862806338289708, "longitude": -43.15216087592453}, {"latitude": -19.85544452851141, "longitude": -43.19147429265792}, {"latitude": -19.866067837939255, "longitude": -43.21743142232267}, {"latitude": -19.83357946514217, "longitude": -43.222143960365656}, {"latitude": -19.80740613401776, "longitude": -43.139033740347074}, {"latitude": -19.787051356277505, "longitude": -43.221092452391815}, {"latitude": -19.868306582779923, "longitude": -43.13963599577518}, {"latitude": -19.851717159795726, "longitude": -43.17049686897503}, {"latitude": -19.789054586051282, "longitude": -43.12931573075888}, {"latitude": -19.877576258264263, "longitude": -43.213804660198754}, {"latitude": -19.80333020809873, "longitude": -43.20001859520409}, {"latitude": -19.79232550121734, "longitude": -43.17007664669623}, {"latitude": -19.853239471009022, "longitude": -43.168834423921524}, {"latitude": -19.82549212927667, "longitude": -43.172845427309525}, {"latitude": -19.884297584618427, "longitude": -43.166459525905374}, {"latitude": -19.786301779843363, "longitude": -43.20201750492285}, {"latitude": -19.878704387699752, "longitude": -43.132726721323934}, {"latitude": -19.85815827940795, "longitude": -43.22503505018933}, {"latitude": -19.871518615672745, "longitude": -43.14994553724479}, {"latitude": -19.844961210813924, "longitude": -43.22446042002407}, {"latitude": -19.787001557144514, "longitude": -43.20840015994869}, {"latitude": -19.84246161002429, "longitude": -43.19680688646043}, {"latitude": -19.87048116252536, "longitude": -43.17453882239562}, {"latitude": -19.858473400079102, "longitude": -43.21910314960791}, {"latitude": -19.811810866396776, "longitude": -43.223354003751595}, {"latitude": -19.7978866496585, "longitude": -43.137244408995215}, {"latitude": -19.804868958022386, "longitude": -43.14119507962276}, {"latitude": -19.842734565414446, "longitude": -43.14900411834938}, {"latitude": -19.884286805124066, "longitude": -43.18160790824757}, {"latitude": -19.835830733538867, "longitude": -43.188230373784045}, {"latitude": -19.795376634942826, "longitude": -43.14449229709369}, {"latitude": -19.812867779564016, "longitude": -43.18873798312493}, {"latitude": -19.87347631067531, "longitude": -43.21682644019518}, {"latitude": -19.809277892690346, "longitude": -43.21197210968686}, {"latitude": -19.857113577420588, "longitude": -43.22536959381067}, {"latitude": -19.793215974615038, "longitude": -43.18489632966163}, {"latitude": -19.81576282953364, "longitude": -43.21129212174286}, {"latitude": -19.8821286664134, "longitude": -43.134550210000306}, {"latitude": -19.82954049551171, "longitude": -43.22191019203464}, {"latitude": -19.84743447648635, "longitude": -43.196804825653984}, {"latitude": -19.854219435514537, "longitude": -43.14548615168724}, {"latitude": -19.853630006818115, "longitude": -43.20261766801879}, {"latitude": -19.8464156950561, "longitude": -43.16434772018948}, {"latitude": -19.82835656911136, "longitude": -43.213563778041}, {"latitude": -19.85029242741772, "longitude": -43.20369380284157}, {"latitude": -19.801148872797754, "longitude": -43.12778445626953}, {"latitude": -19.839579965908968, "longitude": -43.221983598627176}, {"latitude": -19.81114691166076, "longitude": -43.200726289923125}, {"latitude": -19.87420928977644, "longitude": -43.15862423002559}, {"latitude": -19.83414996901879, "longitude": -43.14316470005894}, {"latitude": -19.79458587635429, "longitude": -43.19431311726907}, {"latitude": -19.811043441811226, "longitude": -43.16248711758442}, {"latitude": -19.79614788483341, "longitude": -43.14481813549563}, {"latitude": -19.881224882800417, "longitude": -43.168980854969845}, {"latitude": -19.792936030541963, "longitude": -43.18167159559166}, {"latitude": -19.813377574032955, "longitude": -43.16563581868923}, {"latitude": -19.801281477165123, "longitude": -43.15118831182413}]
    return marcadores.slice(10, 30)
  }


  return (
    <View style={{flex: 1}}>
    <MapView
      style={styles.map}
      customMapStyle={mapStyleDark}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {
        gerarMarcadoresProximos().map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker}
            anchor={{ x: 0, y: 0 }}
            onPress={() => {
              setSelectedMarker(marker);
              setModalVisible(true);
            }}
          >
            <View style={{ backgroundColor: '#333', borderColor: "#fff", borderStyle: "solid", borderWidth: 1, padding: 6, borderRadius: 1000 }}>
              <Text style={{ color: 'white', fontSize: 12, textAlign: "center", aspectRatio: 1 }}>{(index + 1) % 3 + 1}</Text>
            </View>
          </Marker>
        ))
      }
    </MapView>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <View style={{
            width: 300,
            // backgroundColor: 'white',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
  },
});