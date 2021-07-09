import React, { useContext } from "react";
import { View, Text } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./WeatherModule.styled";
import { mainGradient } from "../../constants/colors";
import { MainContext } from "../../constants/context";

type PropTypes = {
  weatherData: any;
};

const WeatherModule = (props: PropTypes) => {
  const { weatherData } = props;
  const { theme } = useContext(MainContext);

  // const { currentTemp, weekTemps } = weatherData;
  let currentTemp = 0;
  let weekTemps: number[] = [0, 0, 0, 0, 0, 0, 0];
  if (weatherData) {
    currentTemp = weatherData.currentTemp;
    weekTemps = weatherData.weekTemps;
  }

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
  } = styles(theme.colors);

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
          {days.map((day, index) => {
            return (
              <View key={day} style={barColumn}>
                <View style={barBackground}>
                  <View
                    style={[bar, { height: (weekTemps[index] / 100) * 80 }]}
                  >
                    <LinearGradient
                      colors={[mainGradient.start, mainGradient.end]}
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
          <Text style={tempValue}>{currentTemp} °F</Text>
        </View>
      </View>
    </View>
  );
};

export default WeatherModule;
