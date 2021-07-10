import { FETCHING_WEATHER, FETCHING_WEATHER_SUCCESS, FETCHING_WEATHER_FAILURE } from '../constants/constants';

const initialState = {
  currentTemp: 0,
  weekTemps: [],
  isFetching: false,
  error: false,
}

export default function weatherReducer(state = initialState, action: any) {
  switch (action.type) {
    case FETCHING_WEATHER:
      return {
        ...state,
        isFetching: true,
        weekTemps: [],
      }
    case FETCHING_WEATHER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        weekTemps: action.data.weekTemps,
        currentTemp: action.data.currentTemp,
      }
    case FETCHING_WEATHER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
      }
    default:
      return state;
  }
}