import React from "react";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

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
    timeStyle,
    textStyle,
    img,
    imgLg,
    row,
    waterIcon,
    timeIcon,
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
            <Entypo name="time-slot" size={18} style={timeIcon} />
            <Text style={timeStyle}>5 days ago</Text>
          </View>
          <View style={row}>
            <MaterialCommunityIcons
              name="watering-can-outline"
              size={22}
              style={waterIcon}
            />
            <Text style={textStyle}>3 days</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  plant: {
    width: 110,
    height: 185,
    marginVertical: 5,
  },
  plantSelected: {
    width: 115,
    height: 190,
    marginVertical: 5,
  },
  card: {
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    marginLeft: 12,
  },
  selected: {
    backgroundColor: "#fff",
  },
  column: {
    flexDirection: "column",
  },
  titleStyle: {
    color: "#192c19",
    fontSize: 16,
    paddingLeft: 2,
  },
  timeStyle: {
    color: "#192c19",
    fontSize: 14,
    paddingLeft: 8,
  },
  textStyle: {
    color: "#192c19",
    fontSize: 14,
    paddingLeft: 4,
  },
  img: {
    width: 110,
    height: 110,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 8,
  },
  imgLg: {
    width: 115,
    height: 115,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 8,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    paddingLeft: 4,
    paddingTop: 3,
  },
  waterIcon: {
    color: "#69a2e2",
  },
  timeIcon: {
    color: "#5e5e5e",
  },
});

export default Plant;
