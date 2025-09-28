import { StatusBar, Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from "@expo/vector-icons/Feather";
import { colors } from "../../theme/colors";
import tabsList from "./app.routes";
import HeaderBackground from "../../components/HeaderBackground";

const Tabs = createBottomTabNavigator();

export default function SignIn() {
  return (
    <>
    <StatusBar barStyle={"light-content"}/>
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.support,
        tabBarStyle: {
          backgroundColor: colors.background,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          color: colors.white,
        },
        headerTintColor: colors.white,
        headerTitleAlign: 'center',
        headerBackground: () => <HeaderBackground />
      }}
    >
      {tabsList.map((tab, index) => {
        if (tab.name === "map") {
          return (
            <Tabs.Screen
              name="map"
              key={index}
              component={tab.component}
              options={{
                headerTitle: tab.title,
                tabBarLabel: "",
                tabBarIcon: ({ focused }) => (
                  <View
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 40,
                      backgroundColor: focused ? colors.primary : colors.support,
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 4,
                      borderColor: colors.background,
                    }}
                  >
                    <Feather name="map" size={30} color={colors.white} />
                    <Text style={{ color: colors.white, fontSize: 10 }}>Mapa</Text>
                  </View>
                ),
              }}
            />
          );
        }

        return (
          <Tabs.Screen
            key={index}
            name={tab.name}
            
            component={tab.component}
            options={{
              ...tab.options,
              tabBarIcon: ({ color }) => (
                <Feather name={tab.icon} size={28} color={color} />
              ),
              tabBarLabel: tab.label,
              tabBarLabelStyle: { fontSize: 10 },
              headerTitle: tab.title,
            }}
          />
        );
      })}
    </Tabs.Navigator>
    </>
  );
}