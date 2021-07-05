import React, { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity, ImageStyle } from "react-native";
import { styles } from "./Plant.styled";
import { MainContext } from "../../constants/context";

type PropTypes = {
  title?: String;
  subtitle?: String;
  waterIncrement: number;
  image: string;
  index: number;
  selectedTaskIndex: number;
  // schedulePushNotification: Function;
  setSelectedTaskIndex: Function;
};

const Plant = (props: PropTypes) => {
  const { theme } = useContext(MainContext);
  const {
    title,
    index,
    selectedTaskIndex,
    image,
    // schedulePushNotification,
    setSelectedTaskIndex,
  } = props;
  const {
    card,
    plant,
    plantSelected,
    column,
    titleStyle,
    textStyle,
    img,
    imgLg,
    row,
    waterIcon,
    selected,
  } = styles(theme.colors);

  const isCurrentTaskSelected = selectedTaskIndex === index;

  return (
    <TouchableOpacity onPress={() => setSelectedTaskIndex(index)}>
      <View
        style={[
          card,
          isCurrentTaskSelected ? plantSelected : plant,
          isCurrentTaskSelected ? selected : null,
        ]}
      >
        <View style={column}>
          <Image
            source={{ uri: image }}
            style={
              isCurrentTaskSelected
                ? (imgLg as ImageStyle)
                : (img as ImageStyle)
            }
          />
          <View style={row}>
            <Text style={titleStyle}>{title}</Text>
          </View>
          <View style={row}>
            <MaterialCommunityIcons
              name="watering-can-outline"
              size={22}
              style={waterIcon}
            />
            <Text style={textStyle}>5 days</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Plant;
