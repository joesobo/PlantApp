import { styleSheetFactory } from "../../constants/Theme";
import { Colors } from "../../constants/types";

export const styles = styleSheetFactory((theme: Colors) => ({
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
    shadowColor: theme.shadow,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    marginLeft: 12,
  },
  selected: {
    backgroundColor: theme.background,
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
    color: theme.waterColor,
  },
}));
