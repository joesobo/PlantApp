import { createContext } from "react";
import { light } from "./colors";

export const MainContext = createContext({
  isDark: false,
  useWeather: false,
  toggleTheme: () => {},
  toggleWeather: () => {},
  theme: {
    colors: light,
  },
  schedulePushNotification: () => {},
  registerForPushNotificationsAsync: () => {},
});
