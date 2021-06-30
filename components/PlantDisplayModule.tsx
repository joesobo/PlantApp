import React from "react";
import { Dimensions, StyleSheet, View, Text, Image } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { Task } from "../screens/Home";

var width = Dimensions.get("window").width; //full width

type PropTypes = {
  task: Task;
};

const PlantDisplayModule = (props: PropTypes) => {
  const { task } = props;
  const { title, description } = task;
  const {
    fullPlant,
    card,
    img,
    row,
    col,
    descContainer,
    titleText,
    descText,
    waterContainer,
    waterInfo,
    waterText,
    water,
    waterValue
  } = styles;

  const data1 = {
    data: [0.3],
  };

  const chartConfig = {
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(99, 191, 189, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.75,
    useShadowColorFromDataset: false, // optional
    fillShadowGradient: "#000",
    fillShadowGradientOpacity: 1,
  };

  return (
    <View style={[fullPlant, card]}>
      <View style={col}>
        <View style={row}>
          <Image source={{ uri: "https://picsum.photos/1018" }} style={img} />
          <View style={[col, descContainer]}>
            <Text style={titleText}>{title}</Text>
            <Text style={descText}>{description}</Text>
          </View>
        </View>

        <View style={[row, waterContainer]}>
          <ProgressChart
            data={data1}
            width={100}
            height={100}
            strokeWidth={12}
            radius={40}
            chartConfig={chartConfig}
            hideLegend={true}
          />
          <View style={[col, waterInfo]}>
            <Text style={waterText}>Interval: 3 days</Text>
            <Text style={waterText}>Water amount: 3 gallons</Text>
          </View>
          <View style={water}>
            <Text style={waterValue}>5 days</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullPlant: {
    width: width - 24,
    height: 250,
    marginTop: 16,
  },
  card: {
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    marginLeft: 12,
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
    margin: 8,
  },
  titleText: {
    fontSize: 20,
  },
  descText: {
    fontSize: 14,
    color: "#bbbbbb",
  },
  waterContainer: {
    marginTop: 8,
    marginLeft: 16,
  },
  waterInfo: {
    display: "flex",
    justifyContent: "center",
    marginLeft: 16,
    marginBottom: 8,
  },
  waterText: {
    fontSize: 16,
    color: "#757575",
  },
  water: {
    height: 100,
    width: 100,
    position: "absolute",
    left: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 2,
  },
  waterValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#656965",
  },
});

export default PlantDisplayModule;
