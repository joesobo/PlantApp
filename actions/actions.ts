import { getWeatherData } from '../api/weather';
import { FETCHING_WEATHER, FETCHING_WEATHER_SUCCESS, FETCHING_WEATHER_FAILURE } from '../constants/constants';
import * as Location from "expo-location";

export const fetchWeatherFromAPI = () => {
  return async (dispatch: any) => {
    dispatch(getWeather());
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const res = await getWeatherData(
      (location as Location.LocationObject).coords.latitude as number,
      (location as Location.LocationObject).coords.longitude as number
    );

    if (res) {
      dispatch(getWeatherSuccess(res));
    } else {
      dispatch(getWeatherFailure());
    }
  }
}

const getWeather = () => {
  return {
    type: FETCHING_WEATHER
  }
}

const getWeatherSuccess = (data: any) => {
  return {
    type: FETCHING_WEATHER_SUCCESS,
    data
  }
}

const getWeatherFailure = () => {
  return {
    type: FETCHING_WEATHER_FAILURE
  }
}