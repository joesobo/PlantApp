import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Task } from "../../types";
import { styles } from "./PlantDisplayModule.styled";

type PropTypes = {
  task: Task;
  navigation: any;
};

const PlantDisplayModule = (props: PropTypes) => {
  const { task, navigation } = props;
  const { title, description } = task;
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
  } = styles;

  return (
    <View style={[fullPlant, card]}>
      <View style={col}>
        <View style={row}>
          <Image source={{ uri: "https://picsum.photos/1018" }} style={img} />
          <View style={[rightCol, descContainer]}>
            <View style={col}>
              <Text style={titleText}>{title}</Text>
              <Text style={descText}>{description}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("PlantInfo")}>
              <Text style={descText}>See more...</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlantDisplayModule;
