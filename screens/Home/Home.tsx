import React, { useEffect, useState, useContext, useCallback } from "react";
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
import Navbar from "../../components/Navbar/Navbar";
import { NavigationStackProp } from "react-navigation-stack";
import { schedulePushNotification } from "../../constants/notifications";
import Moment from "moment";

const Home = ({ navigation }: NavigationStackProp) => {
  const { theme, useWeather, isDark, useNotifications } =
    useContext(MainContext);
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
      description: "This is a description of the first plant",
      waterIncrement: 5,
      needWatering: true,
      lastWaterTime: Moment("2021-07-06").toDate(),
      fertIncrement: 14,
      needFertilizer: true,
      lastFertTime: Moment("2021-08-01").toDate(),
      image: "https://reactjs.org/logo-og.png",
    },
    {
      title: "2",
      waterIncrement: 1,
      needWatering: true,
      lastWaterTime: Moment("2021-08-07").toDate(),
      fertIncrement: 0,
      image: "https://reactjs.org/logo-og.png",
    },
    {
      title: "3",
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
      waterIncrement: 0,
      fertIncrement: 0,
      image: "https://reactjs.org/logo-og.png",
    },
  ]);
  const [displayTaskItems, setDisplayTaskItems] = useState<Task[]>(taskItems);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(-1);
  const [plantModalVisible, setPlantModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    setDisplayTaskItems(taskItems);
  }, [taskItems]);

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

  const daysToSeconds = (days: number) => {
    return days * 24 * 60 * 60;
  };

  const canNotifyForEl = (elIncrement: number) => {
    return useNotifications && elIncrement !== 0;
  };

  const createTask = (task: Task) => {
    const { waterIncrement, fertIncrement } = task;
    addTask(task);
    canNotifyForEl(waterIncrement)
      ? schedulePushNotification(
          daysToSeconds(waterIncrement),
          "Hey there! It's time to water your plant!",
          task,
          true
        )
      : null;
    canNotifyForEl(fertIncrement)
      ? schedulePushNotification(
          daysToSeconds(fertIncrement),
          "Hey there! It's time to fertilizer your plant!",
          task,
          false
        )
      : null;
  };

  const updateTask = (task: Task) => {
    setTaskItems([
      ...taskItems.slice(0, selectedTaskIndex),
      task,
      ...taskItems.slice(selectedTaskIndex + 1),
    ]);
  };

  return (
    <View style={page}>
      <Navbar
        navigation={navigation}
        setNewModalVisible={setPlantModalVisible}
        useAddPlant
      />
      <PlantModal
        visible={plantModalVisible || editModalVisible}
        setVisible={
          editModalVisible ? setEditModalVisible : setPlantModalVisible
        }
        buttonFunc={editModalVisible ? updateTask : createTask}
        buttonText={editModalVisible ? "Save" : "Create"}
        titleText={
          editModalVisible ? "Update Information" : "Plant Information"
        }
        startTask={
          editModalVisible ? displayTaskItems[selectedTaskIndex] : undefined
        }
      />
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
                index={selectedTaskIndex}
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
