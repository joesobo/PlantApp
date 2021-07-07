import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import Home from "../screens/Home/Home";
import PlantInfo from "../screens/PlantInfo/PlantInfo";
import LinkingConfiguration from "./LinkingConfiguration";
import { styles } from "./index.styled";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
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
  const { container } = styles(theme.colors);

  return (
    <DrawerContentScrollView {...props} style={container}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close Drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem label="Toggle Dark Mode" onPress={toggleTheme} />
    </DrawerContentScrollView>
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
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="PlantInfo" component={PlantInfo} />
    </Drawer.Navigator>
  );
}
