import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useContext } from "react";
import { Platform } from "react-native";
import { MainContext } from "./context";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const schedulePushNotification = async (
  time: number,
  title: string,
  body?: string
) => {
  const { useNotifications } = useContext(MainContext);

  if (Platform.OS !== "web" && Constants.isDevice && useNotifications) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        // data: { data: "goes here" },
      },
      trigger: { seconds: time },
    });
  }
};

export const registerForPushNotificationsAsync = async () => {
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
};
