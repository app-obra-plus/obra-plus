import { useNavigation } from "@react-navigation/native";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from "@expo/vector-icons/Feather";
import Map from "./modules/map/Map";
import { SafeAreaView } from "react-native-safe-area-context";
import UserHome from "./modules/user/UserHome";
import UserConfigRouter from "./modules/user/User.routes";

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

const ChatScreen = () => (
  <SafeAreaView edges={['top', 'left', 'right']} style={stylesEmpty.container}>
    <Text style={stylesEmpty.text}>Chat Screen</Text>
  </SafeAreaView>
);

const SearchScreen = () => (
  <SafeAreaView edges={['top', 'left', 'right']} style={stylesEmpty.container}>
    <Text style={stylesEmpty.text}>Search Screen</Text>
  </SafeAreaView>
);

const tabsList: {
  name: string;
  component: React.ComponentType<any>;
  icon: React.ComponentProps<typeof Feather>['name'];
  label: string;
}[] = [
  {
    name: "chat",
    component: ChatScreen,
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
    component: SearchScreen,
    icon: "search",
    label: "Search"
  },
  {
    name: "settings",
    component: UserConfigRouter,
    icon: "settings",
    label: "Usuário"
  }
]

export default function SignIn() {
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