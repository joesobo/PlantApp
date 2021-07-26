import { createContext } from "react";
import { light } from "./colors";

export const MainContext = createContext({
  isDark: false,
  toggleTheme: () => {},
  theme: {
    colors: light,
  },
  schedulePushNotification: () => {},
  registerForPushNotificationsAsync: () => {},
});
