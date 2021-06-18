import * as React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Foundation";

type PropTypes = {
  title: String;
  subtitle: String;
};

const Plant = (props: PropTypes) => {
  const { title, subtitle } = props;
  const { card, row, column, buttonRow, button, buttonText } = styles;

  return (
    <View style={card}>
      <View style={row}>
        <Icon
          {...props}
          name="trees"
          size={50}
          style={{
            color: `#12561d`,
          }}
        />
        <View style={column}>
          <Text>{title}</Text>
          <Text>{subtitle}</Text>
        </View>
      </View>
      <Image
        source={{ uri: "https://picsum.photos/700" }}
        style={{ width: 200, height: 200, borderRadius: 8 }}
      />
      <View style={buttonRow}>
        <TouchableOpacity
          style={button}
          onPress={() => console.log("Oyy")}>
          <Text style={buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={button}
          onPress={() => console.log("Cunt")}>
          <Text style={buttonText}>Ok</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#a1a1a1",
    borderRadius: 8,
    padding: 8,
  },
  row: {
    width: 200,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column: {
    marginLeft: 8,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  buttonRow: {
    marginTop: 8,
    width: 200,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    width: 75,
    backgroundColor: "#6a828a",
    padding: 4,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#e4eef0",
    fontSize: 16,
    fontweight: "bold",
  }
});

export default Plant;
