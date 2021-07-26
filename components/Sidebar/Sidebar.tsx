import { DrawerContentOptions, DrawerItemList } from "@react-navigation/drawer";
import {
  DrawerNavigationHelpers,
  DrawerDescriptorMap,
} from "@react-navigation/drawer/lib/typescript/src/types";
import {
  DrawerNavigationState,
  ParamListBase,
} from "@react-navigation/routers";
import React, { useContext } from "react";
import { Switch, View, Text } from "react-native";
import { darkColor, mainColor, white } from "../../constants/colors";
import { MainContext } from "../../constants/context";
import { styles } from "./Sidebar.styled";

type PropTypes = JSX.IntrinsicAttributes &
  Omit<DrawerContentOptions, "style" | "contentContainerStyle"> & {
    state: DrawerNavigationState<ParamListBase>;
    navigation: DrawerNavigationHelpers;
    descriptors: DrawerDescriptorMap;
  };

const Sidebar = (props: PropTypes) => {
  const { toggleTheme, theme, isDark } = useContext(MainContext);
  const { stretch, spaced, darkSwitch, text } = styles(theme.colors);

  return (
    <View style={stretch}>
      <View style={spaced}>
        <DrawerItemList
          {...props}
          activeTintColor={theme.colors.darkText}
          inactiveTintColor={theme.colors.text}
          activeBackgroundColor="#9ac565bb"
        />
      </View>
      <View style={darkSwitch}>
        <Text style={text}>Toggle Dark</Text>
        <Switch
          trackColor={{ false: darkColor, true: mainColor }}
          thumbColor={isDark ? darkColor : white}
          ios_backgroundColor={isDark ? darkColor : mainColor}
          onValueChange={toggleTheme}
          value={isDark}
        />
      </View>
    </View>
  );
};

export default Sidebar;
