import { StyleSheet, Dimensions } from "react-native";

var width = Dimensions.get("window").width; //full width

export const styles = StyleSheet.create({
  fullPlant: {
    width: width - 24,
    marginTop: 16,
  },
  card: {
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    marginLeft: 12,
    padding: 8,
  },
  img: {
    width: 130,
    height: 130,
    borderRadius: 8,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
  descContainer: {
    marginLeft: 8,
  },
  titleText: {
    fontSize: 20,
  },
  descText: {
    fontSize: 14,
    color: "#bbbbbb",
  },
  rightCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
