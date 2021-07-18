import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../constants/types";

var width = Dimensions.get("window").width; //full width

export let styles = (props: Colors) =>
  StyleSheet.create({
    background: {
      backgroundColor: props.background,
      flex: 1,
    },
    header: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    titleText: {
      color: props.buttonText,
      fontSize: 24,
      fontWeight: "bold",
      paddingBottom: 8,
    },
    backgroundContainer: {
      borderBottomLeftRadius: 50,
      position: "absolute",
      overflow: "hidden",
      width: width,
    },
    smallHeight: {
      height: 125,
    },
    container: {
      paddingTop: 50,
      position: "relative",
    },
  });
