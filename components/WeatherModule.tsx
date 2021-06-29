import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";

const width = Dimensions.get("window").width; //full width

const WeatherModule = () => {
  const data1 = {
    data: [0.75],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(144, 195, 91, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    fillShadowGradient: "#000",
    fillShadowGradientOpacity: 1,
  };

  const { row, barChart, bar, barBackground } = styles;

  return (
    <View style={row}>
      <ProgressChart
        data={data1}
        width={125}
        height={125}
        strokeWidth={12}
        radius={40}
        chartConfig={chartConfig}
        hideLegend={true}
      />
      <View style={barChart}>
        <View style={barBackground}>
          <View style={bar} />
        </View>
        <View style={barBackground}>
          <View style={bar} />
        </View>
        <View style={barBackground}>
          <View style={bar} />
        </View>
        <View style={barBackground}>
          <View style={bar} />
        </View>
        <View style={barBackground}>
          <View style={bar} />
        </View>
        <View style={barBackground}>
          <View style={bar} />
        </View>
        <View style={barBackground}>
          <View style={bar} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 4,
    paddingRight: 12,
  },
  barChart: {
    width: width - 24 - 125 - 18,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  bar: {
    width: 12,
    height: 60,
    backgroundColor: "#9ac5659a",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  barBackground: {
    width: 12,
    height: 80,
    backgroundColor: "#e7e7e7",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
});

export default WeatherModule;
