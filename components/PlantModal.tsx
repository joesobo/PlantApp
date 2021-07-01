import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
} from "react-native";
import * as Notifications from "expo-notifications";

type PropTypes = {
  visible: boolean;
  setVisible: Function;
  addTask: Function;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const schedulePushNotification = async (time: number) => {
  if (Platform.OS !== "web") {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hey there! It's time to water your plant!",
        body: "{X} plant needs {Y} amount of water",
        // data: { data: "goes here" },
      },
      trigger: { seconds: time },
    });
  }
};

const PlantModal = (props: PropTypes) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dayIncrement, setDayIncrement] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState<number>(Date.now());

  const { visible, setVisible, addTask } = props;
  const {
    modal,
    modalView,
    titleWrapper,
    titleText,
    input,
    row,
    column,
    commandText,
    button,
    leftButton,
    rightButton,
  } = styles;

  const initialState = () => {
    setTitle("");
    setDescription("");
    setDayIncrement(0);
    setCurrentDate(Date.now());
  };

  const onDaysChanged = (text: string) => {
    text.replace(/[^0-9]/g, "");
    let num = parseInt(text);
    if (isNaN(num) || num == undefined || num < 0) {
      num = 0;
    }
    if (num > 30) {
      num = 30;
    }
    setDayIncrement(num);
  };

  return (
    <Modal style={modal} animationType="slide" visible={visible} transparent>
      <View style={titleWrapper}>
        <Text style={titleText}>Plant Information</Text>
      </View>
      <View style={modalView}>
        <View style={row}>
          <Text style={commandText}>Title</Text>
          <TextInput
            style={input}
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#858585"
            placeholder="Title..."
          />
        </View>
        <View style={row}>
          <Text style={commandText}>Description</Text>
          <TextInput
            style={input}
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="#858585"
            placeholder="Description..."
          />
        </View>
        <View style={column}>
          <View style={row}>
            <Text style={commandText}>Set Increment</Text>
            <TextInput
              style={input}
              value={dayIncrement.toString()}
              onChangeText={onDaysChanged}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>
        </View>
        <View style={row}>
          <TouchableOpacity
            style={[button, leftButton]}
            onPress={() => {
              initialState();
              setVisible(false);
            }}
          >
            <Text style={commandText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[button, rightButton]}
            onPress={() => {
              addTask({
                title,
                description,
                currentDate,
                dayIncrement,
              });
              schedulePushNotification((currentDate - Date.now()) / 1000);
              initialState();
              setVisible(false);
            }}
          >
            <Text style={commandText}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
    alignSelf: "stretch",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  modal: {
    borderWidth: 0,
    borderColor: "transparent",
    alignSelf: "stretch",
  },
  modalView: {
    backgroundColor: "#ffffff",
    borderBottomColor: "#a1a1a1",
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingBottom: 4,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "space-around",
  },
  titleWrapper: {
    backgroundColor: "#ffffff",
    borderBottomColor: "#a1a1a1",
    borderBottomWidth: 1,
    paddingTop: 16,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#52554F",
    paddingTop: 24,
    paddingBottom: 16,
    alignSelf: "stretch",
    textAlign: "center",
  },
  input: {
    height: 40,
    marginVertical: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: "#a1a1a1",
    color: "#dfdfdf",
    alignSelf: "stretch",
    width: "40%",
    borderRadius: 4,
  },
  commandText: {
    color: "#656965",
    minWidth: "55%",
    marginRight: 8,
  },
  button: {
    borderWidth: 1,
    borderColor: "#a1a1a1",
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    flex: 1,
  },
  leftButton: {
    marginRight: 8,
  },
  rightButton: {
    marginLeft: 8,
  },
});

export default PlantModal;
