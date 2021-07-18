import React, { useContext } from "react";
import { View, Text } from "react-native";
import { MainContext } from "../../constants/context";
import { styles } from "./Settings.styled";
import Navbar from "../../components/Navbar/Navbar";
import { LinearGradient } from "expo-linear-gradient";
import { backgroundGradient } from "../../constants/colors";

const Settings = ({ navigation }: any) => {
  const { theme } = useContext(MainContext);
  const {
    background,
    container,
    header,
    titleText,
    backgroundContainer,
    smallHeight,
  } = styles(theme.colors);

  return (
    <View style={background}>
      <Navbar navigation={navigation} useAddPlant={false} />
      <View style={[container, smallHeight]}>
        <View style={backgroundContainer}>
          <LinearGradient
            colors={[backgroundGradient.start, backgroundGradient.end]}
            start={[1, 0]}
            end={[0, 1]}
            style={smallHeight}
          ></LinearGradient>
        </View>
        <View style={header}>
          <Text style={titleText}>Settings</Text>
        </View>
      </View>
    </View>
  );
};

export default Settings;
