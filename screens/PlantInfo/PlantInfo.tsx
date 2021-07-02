import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { styles } from "./PlantInfo.styled";
import { LinearGradient } from "expo-linear-gradient";

const PlantInfo = ({
  navigation,
}: StackScreenProps<RootStackParamList, "PlantInfo">) => {
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
  } = styles;

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

  return (
    <View style={container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <MaterialIcons style={backIcon} name="arrow-back" size={26} />
      </TouchableOpacity>

      <View style={bottomInfo}>
        <View style={imgWrapper}>
          <Image source={{ uri: "https://picsum.photos/1018" }} style={img} />
        </View>

        <View style={col}>
          <Text>Title</Text>
          <Text>Description...</Text>
        </View>

        {/* Water */}
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
              <Text style={infoText}>Interval: 3 days</Text>
              <Text style={infoText}>Water: 3 gallons</Text>
            </View>
          </View>

          <TouchableOpacity style={button}>
            <LinearGradient
              colors={["#98bfebb9", "#69a2e2bc"]}
              start={[0, 0]}
              end={[1, 1]}
              style={gradientButton}
            >
              <Text style={buttonText}>Feed</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Fertilizer */}
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
              <Text style={infoText}>Interval: 1 week</Text>
              <Text style={infoText}>Fertalizer: 2 scoops</Text>
            </View>
          </View>

          <TouchableOpacity style={button}>
            <LinearGradient
              colors={["#f3cb90ba", "#efb051bc"]}
              start={[0, 0]}
              end={[1, 1]}
              style={gradientButton}
            >
              <Text style={buttonText}>Feed</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PlantInfo;
