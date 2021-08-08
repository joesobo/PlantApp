import { createContext } from "react";
import { light } from "./colors";
import { Task } from "./types";

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
    _task: Task,
    _body?: string | undefined
  ) => {},
  registerForPushNotificationsAsync: () => {},
});
