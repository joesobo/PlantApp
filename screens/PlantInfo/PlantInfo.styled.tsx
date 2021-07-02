import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 50,
    flex: 1,
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
    backgroundColor: "#f5f5f5",
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
    color: "#757575",
  },
  infoContainer: {
    backgroundColor: "#ffffff",
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
    color: "#656965",
    position: "absolute",
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#52554F",
    marginLeft: 8,
  },
  titleRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  waterIcon: {
    color: "#69a2e2",
  },
  fertIcon: {
    color: "#A2CA6B",
  },
});
