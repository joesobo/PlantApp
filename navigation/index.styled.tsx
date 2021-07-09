import { StyleSheet } from "react-native";
import { Colors } from "../constants/types";

export let styles = (props: Colors) =>
  StyleSheet.create({
    spaced: {
      display: "flex",
      justifyContent: "space-between",
      flex: 1,
      backgroundColor: props.background,
    },
    buttons: {
      marginBottom: 48,
    },
  });
