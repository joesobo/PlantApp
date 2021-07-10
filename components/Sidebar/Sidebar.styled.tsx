import { StyleSheet } from "react-native";
import { Colors } from "../../constants/types";

export let styles = (props: Colors) =>
  StyleSheet.create({
    spaced: {
      display: "flex",
      justifyContent: "space-between",
      flex: 1,
    },
    buttons: {
      marginBottom: 48,
    },
    stretch: {
      display: "flex",
      flex: 1,
      backgroundColor: props.background,
    },
  });
