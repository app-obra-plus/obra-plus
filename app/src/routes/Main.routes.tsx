import { createNativeStackNavigator } from "@react-navigation/native-stack"
import App from "../screens/App/App"
import SignIn from "../screens/auth/SignIn/SignIn"
import AuthRouter from "./Auth.routes"
import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { useAuthStore } from "../stores/useAuthStore"

const Stack = createNativeStackNavigator()

export default function MainRouter() {
  const { user } = useAuthStore()
  const { navigate } = useNavigation()
  
  useEffect(() => {
    if (!user) {
      navigate("auth")  
    } else {
      navigate("app")
    }
  }, [user])

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="auth"
        component={AuthRouter}
      />
      <Stack.Screen 
        name="app"
        component={App}
      />
    </Stack.Navigator>
  )
}