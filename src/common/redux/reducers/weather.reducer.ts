import { CurrentWeatherDataResponse } from '@common/types/current-data.type'
import { ReducerArgs } from '@common/types/reducer.type'
import { ForecastDataResponse } from '../../types/forecast-data.type'
import { REHYDRATE } from 'redux-persist'

export interface weatherReducerState {
  currentWeatherData: CurrentWeatherDataResponse | null
  forecastData: ForecastDataResponse | null
}

const initialState: weatherReducerState = {
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
): weatherReducerState {
  switch (type) {
    case REHYDRATE:
      if (payload) {
        state.currentWeatherData = payload.currentWeatherData
        state.forecastData = payload.forecastData
      }
      return Object.create(state)
    case weatherReducerCase.setCurrentWeatherData:
      state.currentWeatherData = payload
      return Object.create(state)
    case weatherReducerCase.setForecastData:
      state.forecastData = payload
      return Object.create(state)
    default:
      return state
  }
}
