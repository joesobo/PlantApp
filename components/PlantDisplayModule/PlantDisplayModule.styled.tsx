import { Dimensions } from "react-native";
import { styleSheetFactory } from "../../constants/Theme";
import { Colors } from "../../constants/types";

var width = Dimensions.get("window").width; //full width

export const styles = styleSheetFactory((theme: Colors) => ({
  fullPlant: {
    width: width - 24,
    marginTop: 16,
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
    flexShrink: 1,
    marginLeft: 8,
  },
  titleText: {
    fontSize: 20,
  },
  descText: {
    fontSize: 14,
    color: theme.descText,
  },
  rightCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));
