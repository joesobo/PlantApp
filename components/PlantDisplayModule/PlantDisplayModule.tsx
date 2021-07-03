import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Task } from "../../constants/types";
import { styles as themedStyles } from "./PlantDisplayModule.styled";
import { useTheme } from "react-native-themed-styles";

type PropTypes = {
  task: Task;
  navigation: any;
};

const PlantDisplayModule = (props: PropTypes) => {
  const { task, navigation } = props;
  const { title, description, image } = task;
  const [styles] = useTheme(themedStyles);
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
          {/* <Image source={{ uri: image }} style={img} /> */}
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
