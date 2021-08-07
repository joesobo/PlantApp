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
      title: "1",
      waterIncrement: 0,
      fertIncrement: 0,
      image:
        "file:///Users/joesoboleski/Library/Developer/CoreSimulator/Devices/1649EB64-C7C3-4809-8282-55967BDED21C/data/Containers/Data/Application/E1BABDE4-AC46-4CDE-AC44-141C790F96D0/Library/Caches/ExponentExperienceData/%2540joesobo%252FPlantApp/ImagePicker/85B2D44A-77AF-4B11-B982-804CE79B6017.jpg",
    },
    {
      title: "2",
      waterIncrement: 0,
      fertIncrement: 0,
      image:
        "file:///Users/joesoboleski/Library/Developer/CoreSimulator/Devices/1649EB64-C7C3-4809-8282-55967BDED21C/data/Containers/Data/Application/E1BABDE4-AC46-4CDE-AC44-141C790F96D0/Library/Caches/ExponentExperienceData/%2540joesobo%252FPlantApp/ImagePicker/85B2D44A-77AF-4B11-B982-804CE79B6017.jpg",
    },
    {
      title: "3",
      waterIncrement: 0,
      fertIncrement: 0,
      image:
        "file:///Users/joesoboleski/Library/Developer/CoreSimulator/Devices/1649EB64-C7C3-4809-8282-55967BDED21C/data/Containers/Data/Application/E1BABDE4-AC46-4CDE-AC44-141C790F96D0/Library/Caches/ExponentExperienceData/%2540joesobo%252FPlantApp/ImagePicker/85B2D44A-77AF-4B11-B982-804CE79B6017.jpg",
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
                const { title, description, waterIncrement, image } = item;

                return (
                  <Plant
                    key={index}
                    title={title}
                    subtitle={description}
                    waterIncrement={waterIncrement}
                    image={image}
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
                deleteTask={deleteTask}
                navigation={navigation}
                setEditModalVisible={setEditModalVisible}
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
