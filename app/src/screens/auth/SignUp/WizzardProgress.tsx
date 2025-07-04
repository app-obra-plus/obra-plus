import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import colors from "../../../styles/style";

interface WizzardProgressProps {
  ratio: number
}

export default function WizzardProgress({ ratio }: WizzardProgressProps) {
  const animatedWidth = useRef(new Animated.Value(ratio)).current

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: ratio,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [ratio])

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.progressContainer}>
      <Animated.View
        style={[
          styles.stepIndicator,
          { width: widthInterpolated }
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    width: "100%",
    backgroundColor: colors.BORDER,
    borderRadius: 4,
  },
  stepIndicator: {
    backgroundColor: colors.PRIMARY,
    height: 4,
    borderRadius: 4,
  },
});
