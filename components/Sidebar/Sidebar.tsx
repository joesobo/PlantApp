import { DrawerItemList } from "@react-navigation/drawer";
import React, { useContext } from "react";
import { Switch, View, Text } from "react-native";
import { MainContext } from "../../constants/context";
import { styles } from "./Sidebar.styled";

const Sidebar = (props: any) => {
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
          trackColor={{ false: "#353535", true: "#a3cb70" }}
          thumbColor={isDark ? "#a3cb70" : "#fff"}
          ios_backgroundColor={isDark ? "#353535" : "#a3cb70"}
          onValueChange={toggleTheme}
          value={isDark}
        />
      </View>
    </View>
  );
};

export default Sidebar;
