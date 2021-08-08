export type RootStackParamList = {
  Home: undefined;
  PlantInfo: undefined;
  Settings: undefined;
};

export type Task = {
  title: string;
  description?: string;
  waterIncrement?: number;
  fertIncrement?: number;
  image: string;
};

export type Colors = {
  shadow: string;
  background: string;
  barBackground: string;
  displayBackground: string;
  darkBackground: string;
  waterColor: string;
  fertColor: string;
  mainColor: string;
  descText: string;
  titleText: string;
  buttonText: string;
  text: string;
  lightText: string;
  darkText: string;
  disabledText: string;
  border: string;
  topIcon: string;
  generalIcon: string;
  cardBackground: string;
  selectedBackground: string;
};
