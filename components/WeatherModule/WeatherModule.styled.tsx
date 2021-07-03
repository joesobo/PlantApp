import { Dimensions } from "react-native";
import { styleSheetFactory } from "../../constants/Theme";
import { Colors } from "../../constants/types";

const width = Dimensions.get("window").width; //full width

export const styles = styleSheetFactory((theme: Colors) => ({
  row: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 4,
    paddingRight: 12,
    position: "relative",
  },
  barChart: {
    width: width - 24 - 125 - 18,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  bar: {
    width: 12,
    height: 60,
    borderRadius: 12,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
  },
  barBackground: {
    width: 12,
    height: 80,
    backgroundColor: theme.barBackground,
    borderRadius: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  temperature: {
    height: 125,
    width: 125,
    position: "absolute",
    left: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  tempValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.text,
  },
  barColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  dayText: {
    fontSize: 12,
    fontWeight: "bold",
    color: theme.lightText,
  },
  weather: {
    width: width - 24,
    height: 125,
    marginTop: 16,
    marginBottom: 64,
  },
  card: {
    borderRadius: 8,
    backgroundColor: theme.background,
    elevation: 5,
    shadowColor: theme.shadow,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    marginLeft: 12,
  },
}));
