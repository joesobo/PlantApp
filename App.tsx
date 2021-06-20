import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Plant from "./components/Plant";
import { Feather, Ionicons } from "@expo/vector-icons";
import PlantModal from "./components/PlantModal";

type Task = {
  title: string;
  description: string;
  currentDate: number;
  dayIncrement: number;
  hourIncrement: number;
  minuteIncrement: number;
};

export default function App() {
  const [taskItems, setTaskItems] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const { screen, title, container, row, rowContainer, icon } = styles;

  const addTask = (task: Task) => {
    Keyboard.dismiss();
    const temp = taskItems.concat(task);
    setTaskItems(temp);
  };

  return (
    <View>
      <PlantModal
        visible={modalVisible}
        setVisible={setModalVisible}
        addTask={addTask}
      />
      <View style={screen}>
        <Text style={title}>Plant List</Text>
        <View style={container}>
          <ScrollView
            centerContent
            style={{ alignSelf: "stretch", paddingBottom: 8 }}
          >
            {taskItems.map((item, index) => {
              const {
                title,
                description,
                currentDate,
                dayIncrement,
                hourIncrement,
                minuteIncrement,
              } = item;

              return (
                <Plant
                  key={index}
                  title={title}
                  subtitle={description}
                  currentDate={currentDate}
                  dayIncrement={dayIncrement}
                  hourIncrement={hourIncrement}
                  minuteIncrement={minuteIncrement}
                />
              );
            })}
          </ScrollView>
        </View>
        <View style={row}>
          <View style={rowContainer}>
            <TouchableOpacity>
              <Feather name="edit-2" size={16} style={icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name="add" size={16} style={icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="remove" size={16} style={icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 20,
    backgroundColor: "#363636",
    height: "100%",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50,
    maxHeight: 450,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#a1a1a1",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingTop: 8,
  },
  title: {
    fontSize: 20,
    marginLeft: 8,
    marginBottom: 4,
    fontWeight: "bold",
    color: "#dfdfdf",
  },
  row: {
    alignItems: "flex-end",
  },
  rowContainer: {
    flexDirection: "row",
    maxWidth: 75,
    borderWidth: 1,
    borderColor: "#a1a1a1",
    borderTopWidth: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginRight: 8,
  },
  icon: {
    padding: 4,
    color: "#dfdfdf",
  },
});
