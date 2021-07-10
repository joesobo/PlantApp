import { StyleSheet } from "react-native";
import { Colors } from "../../constants/types";

export let styles = (props: Colors) =>
  StyleSheet.create({
    icon: {
      color: props.generalIcon,
    },
    background: {
      backgroundColor: props.background,
      flex: 1,
      paddingVertical: 48,
      paddingHorizontal: 16,
    },
  });
