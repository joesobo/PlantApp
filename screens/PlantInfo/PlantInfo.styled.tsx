import { StyleSheet, Dimensions } from "react-native";

var width = Dimensions.get("window").width; //full width

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F0F0",
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
  fertIcon: {
    color: "#a3cb70",
  },
  waterIcon: {
    color: "#69a2e2",
  },
  backIcon: {
    marginLeft: 12,
    color: "#52554F",
  },
  bottomInfo: {
    backgroundColor: "#fff",
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
    shadowColor: "#000",
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
    overflow: "hidden"
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  gradientButton: {
    padding: 8,
  },
});
