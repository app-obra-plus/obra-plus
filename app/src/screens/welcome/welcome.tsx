import React from "react";
import { Image, ImageBackground, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LinearGradient } from 'expo-linear-gradient';



const welcome_background = require("../../../assets/backgrounds/welcome-background.png")
const logo = require("../../../assets/logo/colorida.png")
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

export default function Welcome() {
  
  const navigation = useNavigation()


  return (
    <SafeAreaView edges={['left', 'right', "bottom"]}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <ImageBackground
        source={welcome_background}
        className="w-screen h-screen justify-between"
      >
        <LinearGradient
          colors={['white', 'transparent']}
          start={{ x: 0.5, y: 0 }}
          locations={[0, 1]}
          end={{ x: 0.5, y: 1 }}
          className="items-center py-16 gap-6"
        >
          <Image source={logo} className="scale-75" />
          <Text 
            className="text-3xl text-center text-white shadow-xl shadow-black elevation-5"
            style={{
              textShadowColor: 'rgba(0, 0, 0, 0.4)',
              textShadowOffset: { width: -1, height: 4 },
              textShadowRadius: 10
            }}
          >
              Menos desperdício, mais economia na sua construção.
          </Text>
        </LinearGradient>
        <LinearGradient 
          colors={['transparent', '#323642', '#323642']}
          start={{ x: 0.5, y: 0 }}
          locations={[0, 0.5, 1]}
          end={{ x: 0.5, y: 1 }}
          className="px-4 py-8 gap-6"
        >
          <Button
            text="Entrar"
            type="primary"
            onPress={() => navigation.navigate("signin" as never)}
          />
          <Button
            text="Criar conta"
            type="outline"
            color="light"
            onPress={() => navigation.navigate("signup" as never)}
          />
          <Button
            text="Entrar como visitante"
            type="link"
            color="light"
          />
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  )
}
