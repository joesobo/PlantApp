import Moment from "moment";

export const testData = [
  {
    title: "Plant #1",
    description: "This is a description of the first plant",
    waterIncrement: 5,
    needWatering: true,
    lastWaterTime: Moment("2021-07-06").toDate(),
    fertIncrement: 14,
    needFertilizer: true,
    lastFertTime: Moment("2021-08-01").toDate(),
    image: "https://reactjs.org/logo-og.png",
  },
  {
    title: "2",
    waterIncrement: 1,
    needWatering: true,
    lastWaterTime: Moment("2021-08-07").toDate(),
    fertIncrement: 0,
    image: "https://reactjs.org/logo-og.png",
  },
  {
    title: "3",
    waterIncrement: 1,
    needWatering: false,
    lastWaterTime: Moment("2021-08-07").toDate(),
    fertIncrement: 1,
    needFertilizer: false,
    lastFertTime: Moment("2021-08-07").toDate(),
    image: "https://reactjs.org/logo-og.png",
  },
  {
    title: "4",
    waterIncrement: 0,
    fertIncrement: 0,
    image: "https://reactjs.org/logo-og.png",
  },
]