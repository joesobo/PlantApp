import React, { useState, useContext, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, ScrollView, TextInput } from "react-native";
import PlantModal from "../../components/PlantModal/PlantModal";
import Plant from "../../components/Plant/Plant";
import WeatherModule from "../../components/WeatherModule/WeatherModule";
import PlantDisplayModule from "../../components/PlantDisplayModule/PlantDisplayModule";
import { Task } from "../../constants/types";
import { styles } from "./Home.styled";
import { backgroundGradient } from "../../constants/colors";
import { MainContext } from "../../constants/context";
import EditModal from "../../components/EditModal/EditModal";
import Navbar from "../../components/Navbar/Navbar";
import { NavigationStackProp } from "react-navigation-stack";

const Home = ({ navigation }: NavigationStackProp) => {
  const { theme, useWeather } = useContext(MainContext);
  const {
    page,
    container,
    background,
    topContainer,
    smallHeight,
    titleText,
    search,
    mainScroll,
  } = styles(theme.colors);

  const [text, setText] = useState("");
  //TODO: Test data remove!
  const [taskItems, setTaskItems] = useState<Task[]>([
    {
      title: "Plant #1",
      description: "This is a description of the first plant",
      waterIncrement: 1,
      needWatering: true,
      fertIncrement: 0,
      image: "https://reactjs.org/logo-og.png",
    },
    {
      title: "2",
      waterIncrement: 1,
      needWatering: true,
      fertIncrement: 1,
      needFertilizer: true,
      image: "https://reactjs.org/logo-og.png",
    },
    {
      title: "3",
      waterIncrement: 1,
      needWatering: false,
      fertIncrement: 1,
      needFertilizer: false,
      image: "https://reactjs.org/logo-og.png",
    },
    {
      title: "4",
      waterIncrement: 0,
      fertIncrement: 0,
      image: "https://reactjs.org/logo-og.png",
    },
  ]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(-1);
  const [newModalVisible, setNewModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);

  const updateTask = (task: Task, index: number) => {
    setTaskItems([
      ...taskItems.slice(0, index),
      task,
      ...taskItems.slice(index + 1),
    ]);
  };

  const addTask = (task: Task) => {
    if (taskItems.length === 0) setSelectedTaskIndex(0);
    const temp = taskItems.concat(task);
    setTaskItems(temp);
  };

  const deleteTask = () => {
    let temp = taskItems;
    temp.splice(selectedTaskIndex, 1);
    setTaskItems(temp);

    if (temp.length <= 0) {
      setSelectedTaskIndex(-1);
    } else {
      forceUpdate();
    }
  };

  return (
    <View style={page}>
      <Navbar
        navigation={navigation}
        setNewModalVisible={setNewModalVisible}
        useAddPlant
      />
      <PlantModal
        visible={newModalVisible}
        setVisible={setNewModalVisible}
        addTask={addTask}
      />
      {selectedTaskIndex !== -1 ? (
        <EditModal
          visible={editModalVisible}
          setVisible={setEditModalVisible}
          updateTask={updateTask}
          task={taskItems[selectedTaskIndex]}
          index={selectedTaskIndex}
        />
      ) : null}
      <View style={container}>
        <View style={[background, smallHeight]}>
          <LinearGradient
            colors={[backgroundGradient.start, backgroundGradient.end]}
            start={[1, 0]}
            end={[0, 1]}
            style={smallHeight}
          ></LinearGradient>
        </View>
        <View style={topContainer}>
          <Text style={titleText}>Your Plants</Text>
          <TextInput
            onChangeText={setText}
            value={text}
            style={search}
            placeholder="Search..."
          ></TextInput>
          <ScrollView showsVerticalScrollIndicator={false} style={mainScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {taskItems.map((item, index) => {
                return (
                  <Plant
                    key={index}
                    task={item}
                    index={index}
                    selectedTaskIndex={selectedTaskIndex}
                    setSelectedTaskIndex={setSelectedTaskIndex}
                  />
                );
              })}
            </ScrollView>
            {selectedTaskIndex !== -1 ? (
              <PlantDisplayModule
                task={taskItems[selectedTaskIndex]}
                index={selectedTaskIndex}
                deleteTask={deleteTask}
                navigation={navigation}
                setEditModalVisible={setEditModalVisible}
                updateTask={updateTask}
              />
            ) : null}
            {useWeather ? <WeatherModule /> : null}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Home;
