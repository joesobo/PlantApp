import { light, dark } from "./Colors";
import { registerThemes } from "react-native-themed-styles";
import { useColorScheme } from "react-native-appearance";

const styleSheetFactory = registerThemes({ light, dark }, (): any => {
  const colorScheme = useColorScheme();
  return ["light", "dark"].includes(colorScheme) ? colorScheme : "light";
});

export { styleSheetFactory };
