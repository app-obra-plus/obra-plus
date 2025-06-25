import { createNativeStackNavigator } from "@react-navigation/native-stack"
import App from "../screens/App"
import SignIn from "../screens/SignIn"
import SignUp from "../screens/SignUp"

const Stack = createNativeStackNavigator()

export default function AuthRouter() {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="signin"
        component={SignIn}
      />
      <Stack.Screen 
        name="signup"
        component={SignUp}
      />
    </Stack.Navigator>
  )
}