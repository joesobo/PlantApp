import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

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
    waterIcon,
    infoTitle,
    infoText,
    fertIcon,
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
        <Text>Go back...</Text>
      </TouchableOpacity>

      {/* Water */}
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

      {/* Fertilizer */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 50,
    flex: 1,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
  generalContainer: {
    marginTop: 12,
    display: "flex",
    alignItems: "center",
    paddingLeft: 8,
    marginVertical: 4,
  },
  generalInfo: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    minHeight: 50,
    display: "flex",
    justifyContent: "center",
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 8,
    padding: 12,
    paddingLeft: 105,
  },
  infoText: {
    fontSize: 14,
    color: "#757575",
  },
  infoContainer: {
    backgroundColor: "#ffffff",
    height: 110,
    width: 110,
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    borderBottomRightRadius: 55,
    borderTopRightRadius: 55,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#656965",
    position: "absolute",
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#52554F",
    marginLeft: 8,
  },
  titleRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  waterIcon: {
    color: "#69a2e2",
  },
  fertIcon: {
    color: "#A2CA6B",
  },
});

export default PlantInfo;
