import baseApi from '@common/core/base-api'
import { config } from 'config'
import { CurrentWeatherDataResponse } from '@common/types/current-data.type'
import { ForecastDataResponse } from '@common/types/forecast-data.type'

export default class WeatherData extends baseApi {
  protected prefix: string = ''

  getCurrentWeather(lat: number, lon: number) {
    console.log(
      `current.json?q=${lat + ',' + lon}&key=${config.API_KEY}&lang=vi&aqi=yes`
    )
    return this.Get<CurrentWeatherDataResponse>(
      `current.json?q=${lat + ',' + lon}&key=${config.API_KEY}&lang=vi&aqi=yes`
    )
  }

  getForecastWeather(lat: number, lon: number, days: number = 1) {
    console.log(
      `forecast.json?q=${lat + ',' + lon}&days=${days}&key=${config.API_KEY}&lang=vi&aqi=yes`
    )
    return this.Get<ForecastDataResponse>(
      `forecast.json?q=${lat + ',' + lon}&days=${days}&key=${config.API_KEY}&lang=vi&aqi=yes`
    )
  }
}
