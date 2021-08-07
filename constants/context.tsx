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
  schedulePushNotification: (
    _time: number,
    _title: string,
    _body?: string | undefined
  ) => {},
  registerForPushNotificationsAsync: () => {},
});
