import { StyleSheet } from "react-native";
import { Colors } from "../../constants/types";

export let styles = (props: Colors) =>
  StyleSheet.create({
    plant: {
      width: 110,
      height: 155,
      marginVertical: 5,
    },
    plantSelected: {
      width: 115,
      height: 160,
      marginVertical: 5,
    },
    card: {
      borderRadius: 8,
      backgroundColor: props.background,
      elevation: 5,
      shadowColor: props.shadow,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.7,
      shadowRadius: 3,
      marginLeft: 12,
    },
    selected: {
      backgroundColor: props.background,
    },
    column: {
      flexDirection: "column",
    },
    titleStyle: {
      color: props.titleText,
      fontSize: 16,
      paddingLeft: 2,
    },
    textStyle: {
      color: props.text,
      fontSize: 14,
      paddingLeft: 4,
    },
    img: {
      width: 110,
      height: 100,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    imgLg: {
      width: 115,
      height: 105,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      textAlign: "center",
      paddingLeft: 4,
      paddingTop: 3,
    },
    waterIcon: {
      color: props.waterColor,
    },
  });
