import { createNativeStackNavigator } from "@react-navigation/native-stack"
import App from "../screens/App/App"
import SignIn from "../screens/auth/SignIn/SignIn"
import AuthRouter from "./Auth.routes"
import { useAuth } from "../hooks/useAuth"
import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"

const Stack = createNativeStackNavigator()

export default function MainRouter() {
  const { user } = useAuth()
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