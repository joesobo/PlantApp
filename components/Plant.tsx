import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { format } from "date-fns";

type PropTypes = {
  title: String;
  subtitle: String;
  currentDate: number;
  dayIncrement: number;
  hourIncrement: number;
  minuteIncrement: number;
};

const Plant = (props: PropTypes) => {
  const {
    title,
    subtitle,
    currentDate,
    dayIncrement,
    hourIncrement,
    minuteIncrement,
  } = props;
  const { card, row, column, titleStyle, subTitleStyle } = styles;

  console.log(currentDate);
  const displayDate = format(currentDate, "MM-d-yy hh:mm a");

  return (
    <View style={card}>
      <View style={row}>
        <Image
          source={{ uri: "https://picsum.photos/1018" }}
          style={{ width: 50, height: 50, borderRadius: 8 }}
        />
        <View style={column}>
          <Text style={titleStyle}>{title}</Text>
          <Text style={subTitleStyle}>{subtitle}</Text>
        </View>
        <View style={column}>
          <Text style={subTitleStyle}>Next: {displayDate}</Text>
          <Text style={subTitleStyle}>
            Increment: {dayIncrement} d {hourIncrement} h {minuteIncrement} m
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf: "stretch",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#a1a1a1",
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    margin: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column: {
    marginLeft: 8,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  titleStyle: {
    color: "#dfdfdf",
    fontSize: 16,
  },
  subTitleStyle: {
    color: "#dfdfdf",
    fontSize: 12,
    flexWrap: "wrap",
  },
});

export default Plant;
