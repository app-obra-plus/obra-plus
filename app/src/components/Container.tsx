import React from "react";
import { StyleSheet, View } from "react-native";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <View style={style.container}>{children}</View>;
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: 16,
  },
});