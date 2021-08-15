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
  const [taskItems, setTaskItems] = useState<Task[]>([]);

  useEffect(() => {
    if (Platform.OS !== "web") {
      async function fetchDataFromStorage() {
        let isDark = await getObject("@isDark");
        let useWeather = await getObject("@useWeather");
        let useNotifications = await getObject("@useNotifications");
        let taskItems = await getObject("@taskItems");

        isDark != null ? setIsDarkTheme(isDark) : null;
        useWeather != null ? setUseWeather(useWeather) : null;
        useNotifications != null ? setUseNotifications(useNotifications) : null;
        taskItems != null ? setTaskItems(taskItems) : null;
        taskItems != null ? setSelectedTaskIndex(0) : null;
      }

      fetchDataFromStorage();
    }
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
        storeObject("@useWeather", !useWeatherSwitch);
        setUseWeather(!useWeatherSwitch);
      },
      toggleNotifications: () => {
        storeObject("@useNotifications", !useNotificationsSwitch);
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
    if (Platform.OS !== "web" && Constants.isDevice) {
      if (useNotificationsSwitch) {
        registerForPushNotificationsAsync();
      }
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
