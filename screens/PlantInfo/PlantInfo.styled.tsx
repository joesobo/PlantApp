import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../constants/types";

var width = Dimensions.get("window").width; //full width

export let styles = (props: Colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: props.displayBackground,
      flex: 1,
      paddingTop: 50,
    },
    row: {
      display: "flex",
      flexDirection: "row",
    },
    col: {
      display: "flex",
      flexDirection: "column",
    },
    generalContainer: {
      marginTop: 12,
      display: "flex",
      alignItems: "center",
      paddingLeft: 8,
      marginVertical: 4,
    },
    generalInfo: {
      backgroundColor: props.darkBackground,
      flex: 1,
      minHeight: 50,
      display: "flex",
      justifyContent: "center",
      marginHorizontal: 8,
      marginBottom: 8,
      borderRadius: 8,
      padding: 12,
      paddingLeft: 105,
    },
    infoText: {
      fontSize: 14,
      color: props.text,
    },
    infoContainer: {
      backgroundColor: props.background,
      height: 110,
      width: 110,
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
      borderBottomRightRadius: 55,
      borderTopRightRadius: 55,
    },
    infoValue: {
      fontSize: 18,
      fontWeight: "bold",
      color: props.text,
      position: "absolute",
    },
    infoTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: props.titleText,
      marginLeft: 8,
    },
    titleRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    fertIcon: {
      color: props.mainColor,
    },
    waterIcon: {
      color: props.waterColor,
    },
    backIcon: {
      marginLeft: 12,
      color: props.generalIcon,
    },
    bottomInfo: {
      backgroundColor: props.background,
      paddingHorizontal: 24,
      paddingTop: 50,
      marginTop: 150,
      flex: 1,
      borderTopRightRadius: 50,
    },
    img: {
      width: 200,
      height: 200,
      borderRadius: 100,
    },
    imgWrapper: {
      elevation: 5,
      shadowColor: props.shadow,
      shadowOffset: { width: 2, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      borderRadius: 100,
      position: "absolute",
      top: -150,
      left: width / 2 - 100,
    },
    button: {
      marginTop: 2,
      marginBottom: 24,
      borderRadius: 50,
      overflow: "hidden",
    },
    buttonText: {
      color: props.buttonText,
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
    gradientButton: {
      padding: 8,
    },
  });