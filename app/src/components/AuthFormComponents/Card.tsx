import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../styles/style";

interface CardProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function Card({ children, title, subtitle }: CardProps) {
  return (
    <View style={style.container}>
      {title && <Text style={style.title}>{title}</Text>}
      {subtitle && <Text style={style.subtitle}>{subtitle}</Text>}
      {children}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.CARD,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    margin: 18,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    color: colors.PRIMARY,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: colors.SECONDARY,
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
  },
})