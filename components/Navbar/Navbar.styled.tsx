import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../constants/types";

var width = Dimensions.get("window").width; //full width

export let styles = (props: Colors) =>
  StyleSheet.create({
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 32,
      paddingHorizontal: 12,
      position: "absolute",
      zIndex: 100,
      width: width,
    },
    icon: {
      color: props.topIcon,
    },
  });
