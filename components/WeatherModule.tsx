import React from "react";
import { Dimensions, StyleSheet, View, Text } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";

const width = Dimensions.get("window").width; //full width

const WeatherModule = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data1 = {
    data: [0.75],
  };

  const chartConfig = {
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(154, 192, 98, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.75,
    useShadowColorFromDataset: false, // optional
    fillShadowGradient: "#000",
    fillShadowGradientOpacity: 1,
  };

  const {
    row,
    barChart,
    bar,
    barBackground,
    temperature,
    tempValue,
    barColumn,
    dayText,
    gradient,
    weather,
    card,
  } = styles;

  return (
    <View style={[weather, card]}>
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
          {days.map((day) => {
            return (
              <View key={day} style={barColumn}>
                <View style={barBackground}>
                  <View style={bar}>
                    <LinearGradient
                      colors={["#D3ECA3bc", "#9DC569bc"]}
                      start={[1, 0]}
                      end={[0, 1]}
                      style={gradient}
                    ></LinearGradient>
                  </View>
                </View>
                <Text style={dayText}>{day}</Text>
              </View>
            );
          })}
        </View>
        <View style={temperature}>
          <Text style={tempValue}>90 °F</Text>
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
    backgroundColor: "#F1F3EF",
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
    color: "#656965",
  },
  barColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  dayText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#CBCBCB",
  },
  weather: {
    width: width - 24,
    height: 125,
    marginTop: 16,
    marginBottom: 64,
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
});

export default WeatherModule;
