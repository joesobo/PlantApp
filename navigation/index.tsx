import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import Home from "../screens/Home/Home";
import PlantInfo from "../screens/PlantInfo/PlantInfo";
import Settings from "../screens/Settings/Settings";
import LinkingConfiguration from "./LinkingConfiguration";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Sidebar from "../components/Sidebar/Sidebar";
import { Ionicons } from "@expo/vector-icons";
import { dark, light } from "../constants/colors";

const Navigation = (props: { isDarkTheme: any }) => {
  const { isDarkTheme } = props;

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator isDarkTheme={isDarkTheme} />
    </NavigationContainer>
  );
};

const Drawer = createDrawerNavigator();

function RootNavigator(props: { isDarkTheme: any }) {
  const { isDarkTheme } = props;

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerType="slide"
      drawerContent={(props) => {
        const filteredProps = {
          ...props,
          state: {
            ...props.state,
            routeNames: props.state.routeNames.filter((routeNames) => {
              return routeNames !== "PlantInfo";
            }),
            routes: props.state.routes.filter((route) => {
              return route.name !== "PlantInfo";
            }),
          },
        };
        return <Sidebar {...filteredProps} />;
      }}
      drawerStyle={{
        width: 200,
      }}
      drawerContentOptions={{
        itemStyle: {
          marginTop: 48,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-home-outline"
              size={size}
              color={
                isDarkTheme
                  ? !focused
                    ? dark.text
                    : dark.topIcon
                  : !focused
                  ? dark.darkText
                  : light.topIcon
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-settings-outline"
              size={size}
              color={
                isDarkTheme
                  ? !focused
                    ? dark.text
                    : dark.topIcon
                  : !focused
                  ? dark.darkText
                  : light.topIcon
              }
            />
          ),
        }}
      />
      <Drawer.Screen name="PlantInfo" component={PlantInfo} />
    </Drawer.Navigator>
  );
}

export default Navigation;
