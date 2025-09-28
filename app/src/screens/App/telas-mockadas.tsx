import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const stylesEmpty = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  }
});


const ChatScreen = () => (
  <SafeAreaView edges={['top', 'left', 'right']} style={stylesEmpty.container}>
    <Text style={stylesEmpty.text}>Chat Screen</Text>
  </SafeAreaView>
);

const SearchScreen = () => (
  <SafeAreaView edges={['top', 'left', 'right']} style={stylesEmpty.container}>
    <Text style={stylesEmpty.text}>Search Screen</Text>
  </SafeAreaView>
);

const AddAdvertisementScreen = () => (
  <SafeAreaView edges={['top', 'left', 'right']} style={stylesEmpty.container}>
    <Text style={stylesEmpty.text}>Add Advertisement Screen</Text>
  </SafeAreaView>
);

export { ChatScreen, SearchScreen, AddAdvertisementScreen };