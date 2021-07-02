import React, { useState } from "react";
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
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList, Task } from "../../types";
import { styles } from "./Home.styled";

const Home = ({ navigation }: StackScreenProps<RootStackParamList, "Home">) => {
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
