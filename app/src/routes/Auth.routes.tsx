import { createNativeStackNavigator } from "@react-navigation/native-stack"
import App from "../screens/App/App"
import SignIn from "../screens/auth/SignIn/SignIn"
import SignUp from "../screens/auth/SignUp/SignUp"
import Welcome from "../screens/welcome/welcome"

const Stack = createNativeStackNavigator()

export default function AuthRouter() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="welcome"
        component={Welcome}
      />
      <Stack.Screen
        name="signin"
        component={SignIn}
      />
      <Stack.Screen 
        name="signup"
        component={SignUp}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}