import { StyleSheet } from "react-native";
import { Colors } from "../constants/types";

export let styles = (props: Colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: props.background,
    },
  });
