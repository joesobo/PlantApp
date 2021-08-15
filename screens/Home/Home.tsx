import React, { useEffect, useState, useContext } from "react";
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

const Home = ({ navigation }: NavigationStackProp) => {
  const { theme, useWeather, isDark, taskItems, selectedTaskIndex } =
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

  const [text, setText] = useState("");
  const [displayTaskItems, setDisplayTaskItems] = useState<Task[]>(taskItems);
  const [plantModalVisible, setPlantModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setDisplayTaskItems(taskItems);
  }, [taskItems]);

  const updateText = (text: string) => {
    setText(text);
    setDisplayTaskItems(taskItems.filter((task) => task.title.includes(text)));
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
        buttonText={editModalVisible ? "Save" : "Create"}
        titleText={
          editModalVisible ? "Update Information" : "Plant Information"
        }
        startTask={
          editModalVisible ? displayTaskItems[selectedTaskIndex] : undefined
        }
        isEdit={editModalVisible}
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
                  />
                );
              })}
            </ScrollView>
            {selectedTaskIndex !== -1 ? (
              <PlantDisplayModule
                task={displayTaskItems[selectedTaskIndex]}
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
