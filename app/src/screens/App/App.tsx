import { useNavigation } from "@react-navigation/native";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from "@expo/vector-icons/Feather";
import Map from "./modules/map/Map";
import { SafeAreaView } from "react-native-safe-area-context";
import UserHome from "./modules/user/UserHome";

const Tabs = createBottomTabNavigator();

const stylesEmpty = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  }
});

const tabsList = [
  {
    name: "chat",
    component: () => (
      <SafeAreaView edges={['top', 'left', 'right']} style={stylesEmpty.container}>
        <Text style={stylesEmpty.text}>Chat Screen</Text>
      </SafeAreaView>
    ),
    icon: "message-circle",
    label: "Chat"
  },
  {
    name: "map",
    component: Map,
    icon: "map",
    label: "Mapa"
  },
  {
    name: "search",
    component: () => (
      <SafeAreaView edges={['top', 'left', 'right']} style={stylesEmpty.container}>
        <Text style={stylesEmpty.text} className="bg-slate-400">Search Screen</Text>
      </SafeAreaView>
    ),
    icon: "search",
    label: "Search"
  },
  {
    name: "settings",
    component: UserHome,
    icon: "settings",
    label: "Usuário"
  }
]

export default function SignIn() {
  const { navigate } = useNavigation()

  return (
    <Tabs.Navigator>
      {
        tabsList.map((tab, index) => (
          <Tabs.Screen
            key={index}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Feather name={tab.icon} size={size} color={color} />
              ),
              headerShown: false,
              tabBarLabel: tab.label,
              tabBarLabelStyle: { fontSize: 14 },
            }}
          />
        ))
      }
    </Tabs.Navigator>
  )
}