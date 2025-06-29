import { useNavigation } from "@react-navigation/native";

export default function useWebNavigation() {
  const {navigate} = useNavigation() 

  function navigate(path: string) {
    navigate(path)
  }
}