import { StyleSheet } from "react-native";
import { Colors } from "../../constants/types";

export let styles = (props: Colors) =>
  StyleSheet.create({
    spaced: {
      display: "flex",
      justifyContent: "space-between",
      flex: 1,
    },
    darkSwitch: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 48,
      justifyContent: "flex-start",
      alignItems: "center",
      marginLeft: 16,
    },
    stretch: {
      display: "flex",
      flex: 1,
      backgroundColor: props.background,
    },
    text: {
      color: props.text,
      fontWeight: "500",
      marginRight: 16,
    },
  });
