import { DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import React, { useContext } from "react";
import { View } from "react-native";
import { MainContext } from "../../constants/context";
import { styles } from "./Sidebar.styled";

const Sidebar = (props: any) => {
  const { toggleTheme, theme } = useContext(MainContext);
  const { stretch, spaced, buttons } = styles(theme.colors);

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
      <View style={buttons}>
        <DrawerItem
          label="Toggle Dark Mode"
          labelStyle={{ color: theme.colors.text }}
          onPress={toggleTheme}
        />
      </View>
    </View>
  );
};

export default Sidebar;
