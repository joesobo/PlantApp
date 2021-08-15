import React, { useState, useMemo, useEffect } from "react";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { MainContext } from "./constants/context";
import { light, dark } from "./constants/colors";
import { Provider as StoreProvider } from "react-redux";
import configureStore from "./reducers/store";
import {
  schedulePushNotification,
  registerForPushNotificationsAsync,
} from "./constants/notifications";
import Constants from "expo-constants";
import { Task } from "./constants/types";
import Moment from "moment";
import { addTask, deleteTask, createTask, updateTask } from "./constants/tasks";
import { storeObject, getObject } from "./constants/storage";

export default function App() {
  Moment.locale("en");

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [useWeatherSwitch, setUseWeather] = useState<boolean>(false);
  const [useNotificationsSwitch, setUseNotifications] =
    useState<boolean>(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(-1);
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

  useEffect(() => {
    async function fetchDataFromStorage() {
      let isDark = await getObject("@isDark");
      setIsDarkTheme(isDark);
    }

    fetchDataFromStorage();
  });

  const context = useMemo(
    () => ({
      isDark: isDarkTheme,
      useWeather: useWeatherSwitch,
      useNotifications: useNotificationsSwitch,
      taskItems: taskItems,
      selectedTaskIndex: selectedTaskIndex,
      addTask: addTask,
      deleteTask: deleteTask,
      createTask: createTask,
      updateTask: updateTask,
      updateTaskItems: (tasks: Task[]) => {
        setTaskItems(tasks);
      },
      updateSelectedIndex: (value: number) => {
        setSelectedTaskIndex(value);
      },
      toggleTheme: () => {
        storeObject("@isDark", !isDarkTheme);
        setIsDarkTheme(!isDarkTheme);
      },
      toggleWeather: () => {
        setUseWeather(!useWeatherSwitch);
      },
      toggleNotifications: () => {
        setUseNotifications(!useNotificationsSwitch);
      },
      theme: {
        colors: isDarkTheme ? dark : light,
      },
      schedulePushNotification: schedulePushNotification,
      registerForPushNotificationsAsync: registerForPushNotificationsAsync,
    }),
    [
      isDarkTheme,
      useWeatherSwitch,
      useNotificationsSwitch,
      selectedTaskIndex,
      taskItems,
    ]
  );

  useEffect(() => {
    if (Platform.OS !== "web" && Constants.isDevice && useNotificationsSwitch) {
      registerForPushNotificationsAsync();
    }
  });

  const store = configureStore();

  return (
    <StoreProvider store={store}>
      <MainContext.Provider value={context}>
        <SafeAreaProvider>
          <Navigation isDarkTheme={isDarkTheme} />
          <StatusBar />
        </SafeAreaProvider>
      </MainContext.Provider>
    </StoreProvider>
  );
}
