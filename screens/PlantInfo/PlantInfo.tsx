import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageStyle,
  ScrollView,
} from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Task } from "../../constants/types";
import { styles } from "./PlantInfo.styled";
import { LinearGradient } from "expo-linear-gradient";
import { RouteProp } from "@react-navigation/native";
import {
  waterGradient,
  fertGradient,
  disabledButton,
} from "../../constants/colors";
import { MainContext } from "../../constants/context";

type PropTypes = {
  route: RouteProp<{ params: { task: Task } }, "params">;
  navigation: any;
};

const PlantInfo = ({ route, navigation }: PropTypes) => {
  const { theme, isDark } = useContext(MainContext);
  const { task } = route.params;
  const {
    title,
    description,
    image,
    fertIncrement,
    waterIncrement,
    needWatering,
    needFertilizer,
  } = task;
  const {
    container,
    row,
    generalContainer,
    infoContainer,
    infoValue,
    col,
    generalInfo,
    titleRow,
    infoTitle,
    infoText,
    backIcon,
    bottomInfo,
    img,
    imgWrapper,
    button,
    buttonText,
    fertIcon,
    waterIcon,
    gradientButton,
    titleText,
    descriptionText,
  } = styles(theme.colors);

  const data1 = {
    data: [0.3],
  };

  const chartConfig1 = {
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

  const data2 = {
    data: [0.4],
  };

  const chartConfig2 = {
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(239, 176, 81, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.75,
    useShadowColorFromDataset: false, // optional
    fillShadowGradient: "#000",
    fillShadowGradientOpacity: 1,
  };

  const intervalText = (days: number) => {
    if (days === 1) {
      return "1 day";
    } else if (days < 7) {
      return `${days} days`;
    } else {
      const weeks = Math.floor(days / 7);
      if (weeks === 1) {
        return "1 week";
      } else {
        return `${weeks} weeks +`;
      }
    }
  };

  return (
    <View style={container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <MaterialIcons style={backIcon} name="arrow-back" size={26} />
      </TouchableOpacity>

      <View style={imgWrapper}>
        <Image source={{ uri: image }} style={img as ImageStyle} />
      </View>
      <ScrollView style={bottomInfo}>
        <View style={col}>
          <Text style={titleText}>{title}</Text>
          <Text style={descriptionText}>{description}</Text>
        </View>

        {/* Water */}
        {waterIncrement !== 0 ? (
          <View style={col}>
            <View style={[row, generalContainer]}>
              <View style={infoContainer}>
                <Text style={infoValue}>5 days</Text>
                <ProgressChart
                  data={data1}
                  width={100}
                  height={100}
                  strokeWidth={12}
                  radius={40}
                  chartConfig={chartConfig1}
                  hideLegend={true}
                />
              </View>
              <View style={[col, generalInfo]}>
                <View style={titleRow}>
                  <MaterialCommunityIcons
                    name="watering-can-outline"
                    size={26}
                    style={waterIcon}
                  />
                  <Text style={infoTitle}>Hydration</Text>
                </View>
                <Text style={infoText}>
                  Interval: {intervalText(waterIncrement as number)}
                </Text>
              </View>
            </View>

            <TouchableOpacity disabled={!needWatering} style={button}>
              <LinearGradient
                colors={[
                  needWatering
                    ? waterGradient.start
                    : isDark
                    ? disabledButton.dark
                    : disabledButton.light,
                  needWatering
                    ? waterGradient.end
                    : isDark
                    ? disabledButton.dark
                    : disabledButton.light,
                ]}
                start={[0, 0]}
                end={[1, 1]}
                style={gradientButton}
              >
                <Text style={buttonText}>Feed</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Fertilizer */}
        {fertIncrement != 0 ? (
          <View style={col}>
            <View style={[row, generalContainer]}>
              <View style={infoContainer}>
                <Text style={infoValue}>2 weeks</Text>
                <ProgressChart
                  data={data2}
                  width={100}
                  height={100}
                  strokeWidth={12}
                  radius={40}
                  chartConfig={chartConfig2}
                  hideLegend={true}
                />
              </View>
              <View style={[col, generalInfo]}>
                <View style={titleRow}>
                  <MaterialCommunityIcons
                    name="tree-outline"
                    size={26}
                    style={fertIcon}
                  />
                  <Text style={infoTitle}>Fertilizer</Text>
                </View>
                <Text style={infoText}>
                  Interval: {intervalText(fertIncrement as number)}
                </Text>
              </View>
            </View>

            <TouchableOpacity disabled={!needFertilizer} style={button}>
              <LinearGradient
                colors={[
                  needFertilizer
                    ? fertGradient.start
                    : isDark
                    ? disabledButton.dark
                    : disabledButton.light,
                  needFertilizer
                    ? fertGradient.end
                    : isDark
                    ? disabledButton.dark
                    : disabledButton.light,
                ]}
                start={[0, 0]}
                end={[1, 1]}
                style={gradientButton}
              >
                <Text style={buttonText}>Feed</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default PlantInfo;
