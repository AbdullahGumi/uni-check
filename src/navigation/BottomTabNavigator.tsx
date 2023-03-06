import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/tabs/home/HomeScreen";
import SettingsScreen from "../screens/tabs/settings/SettingsScreen";

import { RootTabParamList } from "./types";

import { HomeIcon, SettingsIcon } from "../../assets/svg";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
  return (
    <>
      <BottomTab.Navigator
        initialRouteName={"Home"}
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#9c9c9c",
          tabBarStyle: {
            borderTopWidth: 0,
            borderTopColor: "transparent",

            backgroundColor: "#000",
          },
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <HomeIcon color={color} size={30} />,
          }}
        />
        <BottomTab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ color }) => <SettingsIcon color={color} size={30} />,
          }}
        />
      </BottomTab.Navigator>
    </>
  );
};

export default BottomTabNavigator;
