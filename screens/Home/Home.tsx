import React, { useState, useContext, useCallback, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, ScrollView, TextInput } from "react-native";
import PlantModal from "../../components/PlantModal/PlantModal";
import Plant from "../../components/Plant/Plant";
import WeatherModule from "../../components/WeatherModule/WeatherModule";
import PlantDisplayModule from "../../components/PlantDisplayModule/PlantDisplayModule";
import { Task } from "../../constants/types";
import { styles } from "./Home.styled";
import { backgroundGradient, light, dark } from "../../constants/colors";
import { MainContext } from "../../constants/context";
import EditModal from "../../components/EditModal/EditModal";
import Navbar from "../../components/Navbar/Navbar";
import { NavigationStackProp } from "react-navigation-stack";
import Moment from "moment";

const Home = ({ navigation }: NavigationStackProp) => {
  const { theme, useWeather, isDark } = useContext(MainContext);
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
  Moment.locale("en");

  const [text, setText] = useState("");
  //TODO: Test data remove!
  const [taskItems, setTaskItems] = useState<Task[]>([
    {
      title: "Plant #1",
      index: 0,
      description: "This is a description of the first plant",
      waterIncrement: 5,
      needWatering: true,
      lastWaterTime: Moment("2021-08-07").toDate(),
      fertIncrement: 14,
      needFertilizer: true,
      lastFertTime: Moment("2021-08-01").toDate(),
      image: "https://reactjs.org/logo-og.png",
    },
    {
      title: "2",
      index: 1,
      waterIncrement: 1,
      needWatering: true,
      lastWaterTime: Moment("2021-08-07").toDate(),
      fertIncrement: 0,
      image: "https://reactjs.org/logo-og.png",
    },
    {
      title: "3",
      index: 2,
      waterIncrement: 1,
      needWatering: false,
      lastWaterTime: Moment("2021-08-07").toDate(),
      fertIncrement: 1,
      needFertilizer: false,
      lastFertTime: Moment("2021-08-07").toDate(),
      image: "https://reactjs.org/logo-og.png",
    },
    {
      title: "4",
      index: 3,
      waterIncrement: 0,
      fertIncrement: 0,
      image: "https://reactjs.org/logo-og.png",
    },
  ]);
  const [displayTaskItems, setDisplayTaskItems] = useState<Task[]>(taskItems);
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

  const updateText = (text: string) => {
    setText(text);
    setDisplayTaskItems(taskItems.filter((task) => task.title.includes(text)));
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
        newIndex={taskItems.length}
      />
      {selectedTaskIndex !== -1 ? (
        <EditModal
          visible={editModalVisible}
          setVisible={setEditModalVisible}
          updateTask={updateTask}
          task={displayTaskItems[selectedTaskIndex]}
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
            onChangeText={updateText}
            value={text}
            style={search}
            placeholderTextColor={isDark ? dark.descText : light.descText}
            placeholder="Search..."
          ></TextInput>
          <ScrollView showsVerticalScrollIndicator={false} style={mainScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {displayTaskItems.map((item, index) => {
                return (
                  <Plant
                    key={index}
                    task={item}
                    index={displayTaskItems.indexOf(item)}
                    selectedTaskIndex={selectedTaskIndex}
                    setSelectedTaskIndex={setSelectedTaskIndex}
                  />
                );
              })}
            </ScrollView>
            {selectedTaskIndex !== -1 ? (
              <PlantDisplayModule
                task={displayTaskItems[selectedTaskIndex]}
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
