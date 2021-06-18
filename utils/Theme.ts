import React from "react";
import { configureFonts, DefaultTheme } from "react-native-paper";

const theme = {
    ...DefaultTheme,
    roundness: 30,
    colors: {
        ...DefaultTheme.colors,
        primary: "#4169E1",
        accent: "#f1c40f",
        favorite: "#BADA55",
        cancelButton: "#a4c639",
        iconColor: "#808080",
    },
};

export default theme;