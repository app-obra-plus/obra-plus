// components/ToastContainer.tsx
import React, { useEffect } from "react";
import { Text, View, Animated, PanResponder } from "react-native";
import { useToastStore } from "./ToastStore";

const ToastItem = ({ id, message, type }: { id: string; message: string; type: string }) => {
  const removeToast = useToastStore((s) => s.removeToast);
  const translateX = new Animated.Value(0);
  const opacity = new Animated.Value(1);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 10,
    onPanResponderMove: (_, gesture) => {
      translateX.setValue(gesture.dx);
    },
    onPanResponderRelease: (_, gesture) => {
      if (Math.abs(gesture.dx) > 100) {
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: gesture.dx > 0 ? 500 : -500,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => removeToast(id));
      } else {
        Animated.spring(translateX, { toValue: 0, useNativeDriver: true }).start();
      }
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => removeToast(id));
    }, 3000);

    return () => clearTimeout(timer);
  }, [id]);

  const bgColors = {
    success: "bg-secondary",
    error: "bg-red-500",
    info: "bg-support",
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        transform: [{ translateX }],
        opacity,
      }}
      className={`w-[90%] self-center p-3 rounded-md border border-white shadow-md mb-2 ${bgColors[type as keyof typeof bgColors]}`}
    >
      <Text className="text-white">{message}</Text>
    </Animated.View>
  );
};

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <View className="absolute top-10 w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </View>
  );
}
