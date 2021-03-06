import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../constants/types";

var height = Dimensions.get("window").height; //full height
var width = Dimensions.get("window").width; //full width

export let styles = (props: Colors) =>
  StyleSheet.create({
    page: {
      backgroundColor: props.background,
    },
    container: {
      paddingTop: 50,
      position: "relative",
    },
    background: {
      borderBottomLeftRadius: 50,
      overflow: "hidden",
      position: "absolute",
      width: width,
    },
    topContainer: {
      width: width,
      height: height,
      paddingTop: 16,
    },
    smallHeight: {
      height: 250,
    },
    titleText: {
      fontSize: 32,
      fontWeight: "bold",
      marginTop: 24,
      marginHorizontal: 12,
      color: props.background,
    },
    search: {
      width: width - 24,
      height: 40,
      marginTop: 16,
      marginHorizontal: 12,
      borderRadius: 8,
      paddingHorizontal: 8,
      backgroundColor: props.background,
      color: props.titleText,
    },
    mainScroll: {
      marginTop: 32,
      borderRadius: 8,
    },
  });
