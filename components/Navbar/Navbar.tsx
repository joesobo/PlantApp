import React, { useContext } from "react";
import { styles } from "./Navbar.styled";
import { MainContext } from "../../constants/context";
import { TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { NavigationStackProp } from 'react-navigation-stack';

type PropTypes = {
  navigation: NavigationStackProp;
  useAddPlant?: boolean;
  setNewModalVisible?: Function;
};

const Navbar = (props: PropTypes) => {
  const { navigation, useAddPlant, setNewModalVisible } = props;
  const { theme } = useContext(MainContext);

  const { row, icon } = styles(theme.colors);

  return (
    <View style={row}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Entypo name="menu" size={20} style={icon} />
      </TouchableOpacity>
      {useAddPlant && setNewModalVisible ? (
        <TouchableOpacity onPress={() => setNewModalVisible(true)}>
          <Entypo name="add-to-list" size={20} style={icon} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Navbar;
