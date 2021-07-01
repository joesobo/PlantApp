import React from "react";
import { Dimensions, StyleSheet, View, Text, Image } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
    generalContainer,
    generalInfo,
    infoText,
    infoContainer,
    infoValue,
    infoTitle,
    titleRow,
    waterIcon,
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
    <View style={[fullPlant, card]}>
      <View style={col}>
        <View style={row}>
          <Image source={{ uri: "https://picsum.photos/1018" }} style={img} />
          <View style={[col, descContainer]}>
            <Text style={titleText}>{title}</Text>
            <Text style={descText}>{description}</Text>
          </View>
        </View>

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
    </View>
  );
};

const styles = StyleSheet.create({
  fullPlant: {
    width: width - 24,
    marginTop: 16,
  },
  card: {
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    marginLeft: 12,
    padding: 8,
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
    marginLeft: 8,
  },
  titleText: {
    fontSize: 20,
  },
  descText: {
    fontSize: 14,
    color: "#bbbbbb",
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

export default PlantDisplayModule;
