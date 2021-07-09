import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import Home from "../screens/Home/Home";
import PlantInfo from "../screens/PlantInfo/PlantInfo";
import LinkingConfiguration from "./LinkingConfiguration";
import { styles } from "./index.styled";
import { View } from "react-native";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { MainContext } from "../constants/context";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

function CustomDrawerContent(props: any) {
  const { toggleTheme, theme } = React.useContext(MainContext);
  const { spaced, buttons } = styles(theme.colors);

  return (
    <View style={spaced}>
      <DrawerItemList
        {...props}
        labelStyle={{ color: theme.colors.darkText }}
        activeBackgroundColor="#9ac565bb"
      />

      <View style={buttons}>
        <DrawerItem
          label="Toggle Dark Mode"
          labelStyle={{ color: theme.colors.text }}
          onPress={toggleTheme}
        />
      </View>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function RootNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
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
        return <CustomDrawerContent {...filteredProps} />;
      }}
      drawerStyle={{
        width: 200,
      }}
      drawerContentOptions={{
        itemStyle: {
          marginHorizontal: 0,
          marginTop: 48,
          borderRadius: 0,
        },
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="PlantInfo" component={PlantInfo} />
    </Drawer.Navigator>
  );
}
