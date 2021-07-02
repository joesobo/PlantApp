import { StyleSheet, Dimensions } from "react-native";

var height = Dimensions.get("window").height; //full height
var width = Dimensions.get("window").width; //full width

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
  },
  container: {
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
  },
  smallHeight: {
    height: 250,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    marginHorizontal: 12,
  },
  icon: {
    color: "#fff",
  },
  titleText: {
    fontSize: 32,
    color: "#e7e7e7",
    fontWeight: "bold",
    marginTop: 24,
    marginHorizontal: 12,
  },
  search: {
    width: width - 24,
    height: 40,
    backgroundColor: "#fff",
    marginTop: 16,
    marginHorizontal: 12,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  mainScroll: {
    marginTop: 32,
    borderRadius: 8,
  },
});
