import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./Plant.styled";

type PropTypes = {
  title?: String;
  subtitle?: String;
  lastWatered: number;
  nextWatering: number;
  index: number;
  selectedTaskIndex: number;
  // schedulePushNotification: Function;
  setSelectedTaskIndex: Function;
};

const Plant = (props: PropTypes) => {
  const {
    title,
    index,
    selectedTaskIndex,
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
  } = styles;

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
            source={{ uri: "https://picsum.photos/1018" }}
            style={isCurrentTaskSelected ? imgLg : img}
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
