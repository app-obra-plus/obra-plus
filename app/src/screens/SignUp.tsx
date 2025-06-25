import { useNavigation } from "@react-navigation/native";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";

export default function SignUp() {
  const {goBack} = useNavigation()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Button
        title="Entrar"
        onPress={() => goBack()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22
  }
});