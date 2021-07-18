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
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: 48,
      marginLeft: 16,
      marginTop: 16,
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
