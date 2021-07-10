import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MainContext } from "../../constants/context";
import { styles } from "./Settings.styled";

const Settings = ({ navigation }: any) => {
  const { theme } = useContext(MainContext);
  const { icon, background } = styles(theme.colors);

  return (
    <View style={background}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Ionicons style={icon} name="md-home-outline" size={22} />
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
