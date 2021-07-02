import React from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Task } from "../screens/Home";

var width = Dimensions.get("window").width; //full width

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
            <TouchableOpacity onPress={() => navigation.navigate('PlantInfo')}>
              <Text style={descText}>See more...</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullPlant: {
    width: width - 24,
    marginTop: 16,
  },
  card: {
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    marginLeft: 12,
    padding: 8,
  },
  img: {
    width: 130,
    height: 130,
    borderRadius: 8,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
  descContainer: {
    marginLeft: 8,
  },
  titleText: {
    fontSize: 20,
  },
  descText: {
    fontSize: 14,
    color: "#bbbbbb",
  },
  rightCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default PlantDisplayModule;
