import { createContext } from "react";
import { light } from "./colors";

export const MainContext = createContext({
  isDark: false,
  useWeather: false,
  useNotifications: false,
  toggleTheme: () => {},
  toggleWeather: () => {},
  toggleNotifications: () => {},
  theme: {
    colors: light,
  },
  schedulePushNotification: () => {},
  registerForPushNotificationsAsync: () => {},
});
