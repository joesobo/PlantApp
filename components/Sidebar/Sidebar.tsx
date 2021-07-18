import { DrawerItemList } from "@react-navigation/drawer";
import React, { useContext } from "react";
import { Switch, View, Text } from "react-native";
import { darkColor, mainColor, white } from "../../constants/colors";
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
