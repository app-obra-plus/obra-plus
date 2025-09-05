import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from 'expo-linear-gradient';



const welcome_background = require("../../../assets/backgrounds/welcome-background.png")
const logo = require("../../../assets/logo/colorida.png")
import Button from "../../components/Button";

export default function Welcome() {
  return (
    <SafeAreaView edges={['left', 'right', "bottom"]}>
      <StatusBar backgroundColor="#ffffff"  style="dark" />
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
          <Text className="text-3xl text-center text-white shadow-xl shadow-black elevation-5">Menos desperdício, mais economia na sua construção.</Text>
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
            variant="primary"
          />
          <Button
            text="Criar conta"
            variant="outline"
          />
          <Button
            text="Entrar como visitante"
            variant="link"
          />
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  )
}
