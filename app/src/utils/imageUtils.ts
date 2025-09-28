import {useImageManipulator, SaveFormat} from "expo-image-manipulator";
import { useState } from "react";

export function useImageOptimizer() {
  const [atualImage, setAtualImage] = useState<string | null>(null);
  const context = useImageManipulator(atualImage || "");

  const optimizeImage = async (uri: string) => {
    setAtualImage(uri);
    const resized = context.resize({ width: 1000 });
    const result = await resized.renderAsync();
    return result;
  }
}
