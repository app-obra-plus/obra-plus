import { useToastStore } from "./ToastStore";


export function useToast() {
  const addToast = useToastStore((s) => s.addToast);
  return { showToast: addToast };
}
