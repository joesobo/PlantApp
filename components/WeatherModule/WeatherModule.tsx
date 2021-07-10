import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./WeatherModule.styled";
import { mainGradient } from "../../constants/colors";
import { MainContext } from "../../constants/context";
import { connect } from "react-redux";
import { fetchWeatherFromAPI } from "../../actions/actions";

type PropTypes = {
  getWeather: any;
  weather: any;
};

const WeatherModule = (props: PropTypes) => {
  const { weather, getWeather } = props;

  const { theme } = useContext(MainContext);

  const [currentTemp, setCurrentTemp] = useState<number>(0);
  const [weekTemps, setWeekTemps] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    getWeather();
  }, []);

  useEffect(() => {
    if (!weather.isFetching && weather.weekTemps.length > 0) {
      setCurrentTemp(weather.currentTemp);
      setWeekTemps(weather.weekTemps);
    }
  }, [!weather.isFetching && weather.weekTemps.length > 0]);

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
    weatherCard,
    card,
    error,
  } = styles(theme.colors);

  return (
    <View style={[weatherCard, card]}>
      {weather.error ? (
        <Text style={error}>OpenWeatherMap API limit hit</Text>
      ) : (
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
                      style={[
                        bar,
                        {
                          height:
                            weekTemps[index] === 0
                              ? 0
                              : (weekTemps[index] / 100) * 80,
                        },
                      ]}
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
      )}
    </View>
  );
};

function mapStateToProps(state: { weather: any }) {
  return {
    weather: state.weather,
  };
}

function mapDispatchToProps(dispatch: (func: any) => any) {
  return {
    getWeather: () => dispatch(fetchWeatherFromAPI()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherModule);
