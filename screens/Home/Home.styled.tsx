import { Dimensions } from "react-native";
import { styleSheetFactory } from "../../constants/Theme";
import { Colors } from "../../constants/types";

var height = Dimensions.get("window").height; //full height
var width = Dimensions.get("window").width; //full width

export const styles = styleSheetFactory((theme: Colors) => ({
  page: {
    backgroundColor: theme.background,
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
    color: theme.topIcon,
  },
  titleText: {
    fontSize: 32,
    color: theme.background,
    fontWeight: "bold",
    marginTop: 24,
    marginHorizontal: 12,
  },
  search: {
    width: width - 24,
    height: 40,
    backgroundColor: theme.background,
    marginTop: 16,
    marginHorizontal: 12,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  mainScroll: {
    marginTop: 32,
    borderRadius: 8,
  },
}));
