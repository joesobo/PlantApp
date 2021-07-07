import React, { useState, useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import PlantModal from "../../components/PlantModal/PlantModal";
import Plant from "../../components/Plant/Plant";
import WeatherModule from "../../components/WeatherModule/WeatherModule";
import PlantDisplayModule from "../../components/PlantDisplayModule/PlantDisplayModule";
import { Task } from "../../constants/types";
import { styles } from "./Home.styled";
import { backgroundGradient } from "../../constants/colors";
import { MainContext } from "../../constants/context";

const Home = ({ navigation }: any) => {
  const { theme } = useContext(MainContext);
  const {
    page,
    icon,
    container,
    background,
    topContainer,
    smallHeight,
    row,
    titleText,
    search,
    mainScroll,
  } = styles(theme.colors);

  const [text, setText] = React.useState("");
  const [taskItems, setTaskItems] = useState<Task[]>([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(-1);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const addTask = (task: Task) => {
    if (taskItems.length === 0) setSelectedTaskIndex(0);
    const temp = taskItems.concat(task);
    setTaskItems(temp);
  };

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
            colors={[backgroundGradient.start, backgroundGradient.end]}
            start={[1, 0]}
            end={[0, 1]}
            style={smallHeight}
          ></LinearGradient>
        </View>
        {/* top elements */}
        <View style={topContainer}>
          <View style={row}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
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
                    // schedulePushNotification={schedulePushNotification}
                  />
                );
              })}
            </ScrollView>
            {selectedTaskIndex !== -1 ? (
              <PlantDisplayModule
                task={taskItems[selectedTaskIndex]}
                navigation={navigation}
              />
            ) : null}
            <WeatherModule />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Home;
