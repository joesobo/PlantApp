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

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [useWeatherSwitch, setUseWeather] = useState<boolean>(false);
  const [useNotificationsSwitch, setUseNotifications] =
    useState<boolean>(false);

  const context = useMemo(
    () => ({
      isDark: isDarkTheme,
      useWeather: useWeatherSwitch,
      useNotifications: useNotificationsSwitch,
      toggleTheme: () => {
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
    [isDarkTheme, useWeatherSwitch, useNotificationsSwitch]
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
