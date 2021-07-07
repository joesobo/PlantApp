import React, { useState, useMemo } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { MainContext } from "./constants/context";
import { light, dark } from "./constants/colors";

const registerForPushNotificationsAsync = async () => {
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

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const context = useMemo(
    () => ({
      isDark: isDarkTheme,
      toggleTheme: () => {
        setIsDarkTheme(!isDarkTheme);
      },
      theme: {
        colors: isDarkTheme ? dark : light,
      },
    }),
    [isDarkTheme]
  );

  // useEffect(() => {
  //   if (Platform.OS !== "web") {
  //     registerForPushNotificationsAsync();
  //   }
  // });

  return (
    <MainContext.Provider value={context}>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    </MainContext.Provider>
  );
}
