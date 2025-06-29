import { createNativeStackNavigator } from "@react-navigation/native-stack"
import App from "../screens/App"
import SignIn from "../screens/SignIn"
import AuthRouter from "./Auth.routes"

const Stack = createNativeStackNavigator()

export default function MainRouter() {
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