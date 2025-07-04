import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../../styles/style";
import Feather from "@expo/vector-icons/Feather";


interface InputProps {
  placeholder?: string;
  secureTextEntry?: boolean;
  icon?: React.ComponentProps<typeof Feather>["name"];
  error?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function Input({ placeholder, secureTextEntry, icon, error, value, onChangeText }: InputProps) {
  const [showHidden, setShowHidden] = React.useState(false);

  const borderError = {
    borderColor: error ? colors.ERROR : "transparent",
    borderWidth: error ? 1 : 0,
  }

  return (
    <View style={style.componentWrapper}>
      <View style={[style.container, borderError]}>
        <View style={{...style.iconContainer}}>
          <Feather style={style.icon} name={icon} size={24} color={colors.PRIMARY} />
        </View>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={style.input}
          secureTextEntry={secureTextEntry && !showHidden}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowHidden(!showHidden)} style={style.iconContainer}>
            <Feather style={style.icon} name={showHidden ? "eye" : "eye-off"} size={24} color={colors.PRIMARY} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={style.error}>{error}</Text>}

    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // borderRadius: 8,
    marginVertical: 0,
    gap: 2,
    height: 60,
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.CARD,
    aspectRatio: 1,
    height: "100%"
  },
  icon: {
    fontSize: 24,
  },
  input: {
    paddingHorizontal: 12,
    backgroundColor: colors.CARD,
    flex: 1,
    fontSize: 16,
    height: "100%",
  },
  componentWrapper: {
    gap: 8,
  },
  error: {
    color: colors.ERROR,
    fontSize: 14,
  }
})
