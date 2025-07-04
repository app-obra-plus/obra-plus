import { useNavigation } from "@react-navigation/native";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from "@expo/vector-icons/Feather";
import Map from "./modules/map/Map";

const Tabs = createBottomTabNavigator();

const tabsList = [
  {
    name: "chat",
    component: () => <Text>Chat Screen</Text>,
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
    component: () => <Text>Search Screen</Text>,
    icon: "search",
    label: "Search"
  },
  {
    name: "settings",
    component: () => <Text>Settings Screen</Text>,
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