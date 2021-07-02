import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    backgroundColor: "#e0e0e0",
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    marginLeft: 12,
  },
  selected: {
    backgroundColor: "#fff",
  },
  column: {
    flexDirection: "column",
  },
  titleStyle: {
    color: "#192c19",
    fontSize: 16,
    paddingLeft: 2,
  },
  textStyle: {
    color: "#192c19",
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
    color: "#69a2e2",
  },
});
