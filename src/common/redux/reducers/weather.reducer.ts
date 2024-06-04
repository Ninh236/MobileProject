import { CurrentWeatherDataResponse } from '@common/types/current-data.type'
import { ReducerArgs } from '@common/types/reducer.type'
import { ForecastDataResponse } from '../../types/forecast-data.type'
import { REHYDRATE } from 'redux-persist'

export interface WeatherReducerState {
  currentWeatherData: CurrentWeatherDataResponse | null
  forecastData: ForecastDataResponse | null
}

const initialState: WeatherReducerState = {
  currentWeatherData: null,
  forecastData: null,
}

export const weatherReducerCase = {
  setCurrentWeatherData: 'weatherReducer/setCurrentWeatherData',
  setForecastData: 'weatherReducer/setForecastData',
}

export default function weatherReducer(
  state = initialState,
  { type, payload }: ReducerArgs
): WeatherReducerState {
  switch (type) {
    case REHYDRATE:
      if (payload) {
        return {
          ...state,
          currentWeatherData: payload.currentWeatherData,
          forecastData: payload.forecastData,
        }
      }
      return state
    case weatherReducerCase.setCurrentWeatherData:
      return {
        ...state,
        currentWeatherData: payload,
      }
    case weatherReducerCase.setForecastData:
      return {
        ...state,
        forecastData: payload,
      }
    default:
      return state
  }
}
