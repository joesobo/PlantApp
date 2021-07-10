import { DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import React, { useContext } from "react";
import { View } from "react-native";
import { MainContext } from "../../constants/context";
import { styles } from "./Sidebar.styled";

const Sidebar = (props: any) => {
  const { toggleTheme, theme } = useContext(MainContext);
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
};

export default Sidebar;
