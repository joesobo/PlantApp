import { StyleSheet } from "react-native";
import { Colors } from "../../constants/types";

export let styles = (props: Colors) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      alignSelf: "stretch",
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      alignSelf: "stretch",
      marginBottom: 24,
    },
    modal: {
      borderWidth: 0,
      borderColor: "transparent",
      alignSelf: "stretch",
    },
    background: {
      backgroundColor: "#00000090",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    },
    modalView: {
      backgroundColor: props.background,
      borderBottomColor: props.border,
      borderBottomWidth: 1,
      paddingHorizontal: 28,
      paddingBottom: 24,
      paddingTop: 20,
      borderTopRightRadius: 50,
      borderTopLeftRadius: 50,
      height: 500,
      overflow: "scroll",
    },
    titleTextStyle: {
      fontWeight: "bold",
      fontSize: 18,
      color: props.titleText,
      paddingTop: 8,
      alignSelf: "stretch",
      textAlign: "center",
    },
    input: {
      height: 30,
      marginVertical: 8,
      padding: 4,
      paddingLeft: 8,
      borderWidth: 1,
      borderColor: props.border,
      color: props.text,
      alignSelf: "stretch",
      width: "46%",
      borderRadius: 8,
    },
    commandText: {
      color: props.text,
      marginRight: 8,
    },
    subCommandText: {
      fontSize: 13,
      color: props.text,
      marginRight: 8,
    },
    buttonTextStyle: {
      color: props.buttonText,
      fontWeight: "bold",
      fontSize: 18,
      textAlign: "center",
    },
    button: {
      borderRadius: 50,
      marginVertical: 8,
      marginBottom: 50,
      flex: 1,
      overflow: "hidden",
    },
    gradientButton: {
      padding: 8,
    },
    icon: {
      color: props.generalIcon,
    },
    imageUpload: {
      backgroundColor: props.barBackground,
      width: 150,
      height: 150,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      marginBottom: 8,
    },
    uploadColumn: {
      flexDirection: "column",
      alignSelf: "stretch",
      justifyContent: "center",
      marginLeft: 8,
      marginBottom: 8,
      width: 150,
    },
    uploadButton: {
      borderColor: props.border,
      borderWidth: 1,
      borderRadius: 8,
      marginVertical: 8,
      padding: 4,
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    uploadText: {
      color: props.text,
    },
    uploadButtonText: {
      color: props.text,
    },
    areaContainer: {
      height: 100,
      borderRadius: 16,
    },
    disabledText: {
      color: props.disabledText,
    },
    spaced: {
      marginTop: 8,
    },
  });
