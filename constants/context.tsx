import { createContext } from "react";
import { useColorScheme } from "react-native-appearance";
import { light } from "./colors";
// const colorScheme = useColorScheme();
  // return ["light", "dark"].includes(colorScheme) ? colorScheme : "light";

export const MainContext = createContext({
  toggleTheme: () => {},
  theme: {
    // colors: ["light", "dark"].includes(useColorScheme()) ? useColorScheme() : "light",
    colors: light
  },
});
