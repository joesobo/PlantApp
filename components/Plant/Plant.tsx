import React, { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity, ImageStyle } from "react-native";
import { styles } from "./Plant.styled";
import { MainContext } from "../../constants/context";
import { Task } from "../../constants/types";

type PropTypes = {
  task: Task;
  index: number;
};

const Plant = (props: PropTypes) => {
  const { theme, selectedTaskIndex, updateSelectedIndex } =
    useContext(MainContext);
  const { task, index } = props;
  const {
    title,
    image,
    fertIncrement,
    waterIncrement,
    needWatering,
    needFertilizer,
  } = task;
  const {
    card,
    plant,
    plantSelected,
    column,
    titleStyle,
    img,
    imgLg,
    row,
    waterIcon,
    fertIcon,
    selected,
    unselected,
  } = styles(theme.colors, needWatering as boolean, needFertilizer as boolean);

  const isCurrentTaskSelected = selectedTaskIndex === index;

  return (
    <TouchableOpacity onPress={() => updateSelectedIndex(index)}>
      <View
        style={[
          card,
          isCurrentTaskSelected ? plantSelected : plant,
          isCurrentTaskSelected ? selected : unselected,
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
            {waterIncrement !== 0 ? (
              <MaterialCommunityIcons
                name="watering-can-outline"
                size={22}
                style={waterIcon}
              />
            ) : null}
            {fertIncrement !== 0 ? (
              <MaterialCommunityIcons
                name="tree-outline"
                size={22}
                style={fertIcon}
              />
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Plant;
