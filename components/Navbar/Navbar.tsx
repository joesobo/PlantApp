import React, { useContext } from "react";
import { styles } from "./Navbar.styled";
import { MainContext } from "../../constants/context";
import { TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

type PropTypes = {
  navigation: any;
  useAddPlant: boolean;
};

const Navbar = (props: PropTypes) => {
  const { navigation, useAddPlant } = props;
  const { theme } = useContext(MainContext);

  const { row, icon } = styles(theme.colors);

  return (
    <View style={row}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Entypo name="menu" size={20} style={icon} />
      </TouchableOpacity>
      {useAddPlant ? (
        <TouchableOpacity onPress={() => null}>
          <Entypo name="add-to-list" size={20} style={icon} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Navbar;
