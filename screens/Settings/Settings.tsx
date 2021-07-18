import React, { useContext, useState } from "react";
import { View, Text, Switch } from "react-native";
import { MainContext } from "../../constants/context";
import { styles } from "./Settings.styled";
import Navbar from "../../components/Navbar/Navbar";
import { LinearGradient } from "expo-linear-gradient";
import {
  backgroundGradient,
  darkColor,
  mainColor,
  white,
} from "../../constants/colors";

const Settings = ({ navigation }: any) => {
  const { theme } = useContext(MainContext);
  const {
    background,
    container,
    header,
    body,
    titleText,
    backgroundContainer,
    smallHeight,
    text,
  } = styles(theme.colors);

  const [useWeather, setUseWeather] = useState<boolean>(false);
  const [useNotifications, setUseNotifications] = useState<boolean>(false);

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

      {/* Body */}
      <View style={body}>
        <Text style={text}>Weather Module</Text>
        <Switch
          trackColor={{ false: darkColor, true: mainColor }}
          thumbColor={useWeather ? darkColor : white}
          ios_backgroundColor={useWeather ? darkColor : mainColor}
          onValueChange={() => setUseWeather(!useWeather)}
          value={useWeather}
        />
        <Text style={text}>Use Notifications</Text>
        <Switch
          trackColor={{ false: darkColor, true: mainColor }}
          thumbColor={useNotifications ? darkColor : white}
          ios_backgroundColor={useNotifications ? darkColor : mainColor}
          onValueChange={() => setUseNotifications(!useNotifications)}
          value={useNotifications}
        />
      </View>
    </View>
  );
};

export default Settings;
