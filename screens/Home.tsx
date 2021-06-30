import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import PlantModal from "../components/PlantModal";
import Plant from "../components/Plant";
import WeatherModule from "../components/WeatherModule";
import PlantDisplayModule from "../components/PlantDisplayModule";

var height = Dimensions.get("window").height; //full height
var width = Dimensions.get("window").width; //full width

export type Task = {
  title?: string;
  description?: string;
  lastWatered: number;
  nextWatering: number;
};

const Home = () => {
  const {
    page,
    container,
    background,
    topContainer,
    smallHeight,
    row,
    icon,
    titleText,
    search,
    card,
    mainScroll,
  } = styles;

  const [text, setText] = React.useState("");
  const [taskItems, setTaskItems] = useState<Task[]>([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(-1);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const addTask = (task: Task) => {
    const temp = taskItems.concat(task);
    setTaskItems(temp);
  };

  // let tempTitle = "";
  // if (
  //   selectedTaskIndex !== -1 &&
  //   taskItems[selectedTaskIndex].title !== undefined
  // ) {
  //   tempTitle = taskItems[selectedTaskIndex].title as string;
  // }

  return (
    <View style={page}>
      <PlantModal
        visible={modalVisible}
        setVisible={setModalVisible}
        addTask={addTask}
      />
      <View style={container}>
        {/* background */}
        <View style={[background, smallHeight]}>
          <LinearGradient
            colors={["#9ac565", "#406428"]}
            start={[1, 0]}
            end={[0, 1]}
            style={smallHeight}
          ></LinearGradient>
        </View>
        {/* top elements */}
        <View style={topContainer}>
          <View style={row}>
            <TouchableOpacity>
              <Entypo name="menu" size={20} style={icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Entypo name="add-to-list" size={20} style={icon} />
            </TouchableOpacity>
          </View>
          <Text style={titleText}>Your Plants</Text>
          <TextInput
            onChangeText={setText}
            value={text}
            style={[search, card]}
            placeholder="Search..."
          ></TextInput>
          <ScrollView showsVerticalScrollIndicator={false} style={mainScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {taskItems.map((item, index) => {
                const { title, description, lastWatered, nextWatering } = item;

                return (
                  <Plant
                    key={index}
                    title={title}
                    subtitle={description}
                    lastWatered={lastWatered}
                    nextWatering={nextWatering}
                    index={index}
                    selectedTaskIndex={selectedTaskIndex}
                    setSelectedTaskIndex={setSelectedTaskIndex}
                    // schedulePushNotification={schedulePushNotification}
                  />
                );
              })}
            </ScrollView>
            {selectedTaskIndex !== -1 ? (
              <PlantDisplayModule task={taskItems[selectedTaskIndex]} />
            ) : null}
            <WeatherModule />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
  },
  container: {
    position: "relative",
  },
  background: {
    borderBottomLeftRadius: 50,
    overflow: "hidden",
    position: "absolute",
    width: width,
  },
  topContainer: {
    width: width,
    height: height,
  },
  smallHeight: {
    height: 250,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    marginHorizontal: 12,
  },
  icon: {
    color: "#fff",
  },
  titleText: {
    fontSize: 32,
    color: "#e7e7e7",
    fontWeight: "bold",
    marginTop: 24,
    marginHorizontal: 12,
  },
  search: {
    width: width - 24,
    height: 40,
    backgroundColor: "#fff",
    marginTop: 16,
    marginHorizontal: 12,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  mainScroll: {
    marginTop: 32,
    borderRadius: 8,
  },
  card: {
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    marginLeft: 12,
  },
});

export default Home;
