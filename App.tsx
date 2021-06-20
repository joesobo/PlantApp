import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Platform,
} from "react-native";
import Plant from "./components/Plant";
import { Feather, Ionicons } from "@expo/vector-icons";
import PlantModal from "./components/PlantModal";
import * as Notifications from "expo-notifications";
import { Subscription } from "@unimodules/core";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

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
  const [expoPushToken, setExpoPushToken] = useState<string>("");
  const [notification, setNotification] = useState<boolean>(false);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  const { screen, title, container, row, rowContainer, icon } = styles;

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token!.toString())
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification ? true : false);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      );
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  });

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
            <TouchableOpacity
              onPress={async () => {
                await schedulePushNotification();
              }}
            >
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
