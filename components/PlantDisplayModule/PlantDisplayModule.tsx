import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, ImageStyle } from "react-native";
import { MainContext } from "../../constants/context";
import { Task } from "../../constants/types";
import { styles } from "./PlantDisplayModule.styled";

type PropTypes = {
  task: Task;
  navigation: any;
};

const PlantDisplayModule = (props: PropTypes) => {
  const { theme } = useContext(MainContext);
  const { task, navigation } = props;
  const { title, description, image } = task;
  const {
    fullPlant,
    card,
    img,
    row,
    col,
    descContainer,
    titleText,
    descText,
    rightCol,
  } = styles(theme.colors);

  return (
    <View style={[fullPlant, card]}>
      <View style={col}>
        <View style={row}>
          <Image source={{ uri: image }} style={img as ImageStyle} />
          <View style={[rightCol, descContainer]}>
            <View style={col}>
              <Text style={titleText}>{title}</Text>
              <Text style={descText}>{description}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PlantInfo", {
                  task: task,
                })
              }
            >
              <Text style={descText}>See more...</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlantDisplayModule;
