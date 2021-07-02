export type RootStackParamList = {
  Home: undefined;
  PlantInfo: undefined;
};

export type Task = {
  title?: string;
  description?: string;
  lastWatered: number;
  nextWatering: number;
};
