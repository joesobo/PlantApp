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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
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
  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [dayIncrement, setDayIncrement] = useState<number>(0);
  const [hourIncrement, setHourIncrement] = useState<number>(0);
  const [minuteIncrement, setMinuteIncrement] = useState<number>(0);
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
    currentTime,
    timeView,
    button,
    leftButton,
    rightButton,
  } = styles;

  const initialState = () => {
    setTitle("");
    setDescription("");
    setDatePickerVisible(false);
    setDayIncrement(0);
    setHourIncrement(0);
    setMinuteIncrement(0);
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

  const onHoursChanged = (text: string) => {
    text.replace(/[^0-9]/g, "");
    let num = parseInt(text);
    if (isNaN(num) || num == undefined || num < 0) {
      num = 0;
    }
    if (num > 72) {
      num = 72;
    }
    setHourIncrement(num);
  };

  const onMinutesChanged = (text: string) => {
    text.replace(/[^0-9]/g, "");
    let num = parseInt(text);
    if (isNaN(num) || num == undefined || num < 0) {
      num = 0;
    }
    if (num > 60) {
      num = 60;
    }
    setMinuteIncrement(num);
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
        <View style={timeView}>
          <View style={row}>
            <Text style={commandText}>Pick Start Date</Text>
            <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
              <Text style={currentTime}>
                {format(currentDate, "hh:mm a MM-d-yy")}
              </Text>
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            minimumDate={new Date()}
            onConfirm={(date) => {
              setCurrentDate(date.valueOf());
              setDatePickerVisible(false);
            }}
            onCancel={() => setDatePickerVisible(false)}
          />
          <View style={column}>
            <View style={row}>
              <Text style={commandText}>Pick A Day Increment</Text>
              <TextInput
                style={input}
                value={dayIncrement.toString()}
                onChangeText={onDaysChanged}
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
            <View style={row}>
              <Text style={commandText}>Pick A Hour Increment</Text>
              <TextInput
                style={input}
                value={hourIncrement.toString()}
                onChangeText={onHoursChanged}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>
            <View style={row}>
              <Text style={commandText}>Pick a Minute Increment</Text>
              <TextInput
                style={input}
                value={minuteIncrement.toString()}
                onChangeText={onMinutesChanged}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>
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
                hourIncrement,
                minuteIncrement,
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
    backgroundColor: "#363636",
    borderBottomColor: "#a1a1a1",
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingBottom: 4,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "space-around",
  },
  titleWrapper: {
    backgroundColor: "#363636",
    borderBottomColor: "#a1a1a1",
    borderBottomWidth: 1,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#dfdfdf",
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
    color: "#dfdfdf",
    minWidth: "55%",
    marginRight: 8,
  },
  currentTime: {
    color: "#718de0",
  },
  timeView: {
    marginVertical: 24,
    alignSelf: "stretch",
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
