import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageStyle,
  ScrollView,
  LogBox,
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
  backgroundGradient,
} from "../../constants/colors";
import { MainContext } from "../../constants/context";

type PropTypes = {
  route: RouteProp<
    {
      params: {
        task: Task;
      };
    },
    "params"
  >;
  navigation: any;
};

const findDays = (lastTime: Date) => {
  const now = new Date();
  const diff = now.getTime() - lastTime.getTime();
  const days = diff / 1000 / 60 / 60 / 24;

  return days;
};

const findBarPercentage = (lastTime: Date, increment: number) => {
  const days = findDays(lastTime);
  const percentage = 1 - days / increment;

  if (percentage < 0) {
    return 0;
  }

  return percentage;
};

const PlantInfo = ({ route, navigation }: PropTypes) => {
  const {
    theme,
    isDark,
    updateTask,
    taskItems,
    updateTaskItems,
    selectedTaskIndex,
  } = useContext(MainContext);
  const { task } = route.params;
  const [curTask, setCurTask] = useState<Task>(task);

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  useEffect(() => {
    setCurTask(task);
  }, [task]);

  let {
    title,
    description,
    image,
    fertIncrement,
    waterIncrement,
    needWatering,
    needFertilizer,
    lastWaterTime,
    lastFertTime,
  } = curTask;
  const {
    page,
    smallHeight,
    background,
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
  } = styles(theme.colors, needWatering as boolean, needFertilizer as boolean);

  const data1 = {
    data: [
      waterIncrement !== 0
        ? findBarPercentage(lastWaterTime as Date, waterIncrement as number)
        : 0,
    ],
  };

  const chartConfig1 = {
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) =>
      data1.data[0] > 0.99
        ? `rgba(163, 203, 112, ${opacity})`
        : data1.data[0] === 0
        ? `rgba(225, 69, 69, ${opacity})`
        : `rgba(99, 191, 189, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    useShadowColorFromDataset: false, // optional
    fillShadowGradient: "#000",
    fillShadowGradientOpacity: 1,
  };

  const data2 = {
    data: [
      fertIncrement !== 0
        ? findBarPercentage(lastFertTime as Date, fertIncrement as number)
        : 0,
    ],
  };

  const chartConfig2 = {
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) =>
      data2.data[0] > 0.99
        ? `rgba(163, 203, 112, ${opacity})`
        : data2.data[0] === 0
        ? `rgba(225, 69, 69, ${opacity})`
        : `rgba(239, 176, 81, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    useShadowColorFromDataset: false, // optional
    fillShadowGradient: "#000",
    fillShadowGradientOpacity: 1,
  };

  const intervalText = (days: number) => {
    if (days === 1) {
      return "1 day";
    } else if (days < 7) {
      return `${Math.floor(days)} days`;
    } else {
      const weeks = Math.floor(days / 7);
      if (weeks === 1) {
        return "1 week";
      } else {
        return `${weeks} weeks +`;
      }
    }
  };

  const water = () => {
    task.needWatering = false;
    task.lastWaterTime = new Date();
    setCurTask({ ...task });
    updateTask(task, taskItems, updateTaskItems, selectedTaskIndex);
  };

  const fertilize = () => {
    task.needFertilizer = false;
    task.lastFertTime = new Date();
    setCurTask({ ...task });
    updateTask(task, taskItems, updateTaskItems, selectedTaskIndex);
  };

  return (
    <View style={page}>
      <View style={[background, smallHeight]}>
        <LinearGradient
          colors={[backgroundGradient.start, backgroundGradient.end]}
          start={[1, 0]}
          end={[0, 1]}
          style={smallHeight}
        ></LinearGradient>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <MaterialIcons style={backIcon} name="arrow-back" size={22} />
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
                <Text style={infoValue}>
                  {intervalText(findDays(lastWaterTime as Date))}
                </Text>
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

            <TouchableOpacity
              disabled={!needWatering}
              style={button}
              onPress={water}
            >
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
                <Text style={infoValue}>
                  {intervalText(findDays(lastFertTime as Date))}
                </Text>
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

            <TouchableOpacity
              disabled={!needFertilizer}
              style={button}
              onPress={fertilize}
            >
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
