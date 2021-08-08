import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, ImageStyle } from "react-native";
import { MainContext } from "../../constants/context";
import { Task } from "../../constants/types";
import { styles } from "./PlantDisplayModule.styled";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { NavigationStackProp } from "react-navigation-stack";

type PropTypes = {
  task: Task;
  index: number;
  deleteTask: () => void;
  navigation: NavigationStackProp;
  setEditModalVisible: (res: boolean) => void;
  updateTask: (task: Task, index: number) => void;
};

const PlantDisplayModule = (props: PropTypes) => {
  const { theme } = useContext(MainContext);
  const {
    task,
    index,
    deleteTask,
    navigation,
    setEditModalVisible,
    updateTask,
  } = props;
  const {
    title,
    description,
    image,
    fertIncrement,
    waterIncrement,
    needWatering,
    needFertilizer,
  } = task;
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
    spacedRow,
    spacedCol,
    icon,
    moreText,
    waterIcon,
    fertIcon,
  } = styles(theme.colors, needWatering as boolean, needFertilizer as boolean);

  const openEditModal = () => {
    setEditModalVisible(true);
  };

  const waterPlant = () => {
    task.needWatering = false;
    updateTask(task, index);
  };

  const fertilizePlant = () => {
    task.needFertilizer = false;
    updateTask(task, index);
  };

  return (
    <View style={[fullPlant, card]}>
      <View style={col}>
        <View style={row}>
          <Image source={{ uri: image }} style={img as ImageStyle} />
          <View style={[rightCol, descContainer]}>
            <View style={spacedCol}>
              <View style={spacedRow}>
                <Text style={titleText}>{title}</Text>
                <View style={row}>
                  <TouchableOpacity onPress={openEditModal}>
                    <MaterialIcons style={icon} name="edit" size={22} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={deleteTask}>
                    <MaterialCommunityIcons
                      name="delete-empty-outline"
                      style={icon}
                      size={22}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={descText}>{description}</Text>
            </View>
            <View style={spacedRow}>
              <View style={row}>
                {waterIncrement !== 0 ? (
                  <TouchableOpacity onPress={waterPlant}>
                    <MaterialCommunityIcons
                      name="watering-can-outline"
                      size={22}
                      style={waterIcon}
                    />
                  </TouchableOpacity>
                ) : null}
                {fertIncrement !== 0 ? (
                  <TouchableOpacity onPress={fertilizePlant}>
                    <MaterialCommunityIcons
                      name="tree-outline"
                      size={22}
                      style={fertIcon}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("PlantInfo", {
                    task: task,
                  })
                }
              >
                <Text style={moreText}>See more...</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlantDisplayModule;
