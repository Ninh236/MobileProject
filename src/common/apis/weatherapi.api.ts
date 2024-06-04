import baseApi from '@common/core/base-api'
import {
  WeatherApiData,
  WeatherApiDataWithForecast,
} from '@common/types/weatherapi-data.type'

export default class WeatherApi extends baseApi {
  constructor() {
    super('http://api.weatherapi.com')
  }

  protected prefix: string = 'v1/'

  getWeather(lat: number, lon: number) {
    return this.Get<WeatherApiData>(
      `current.json?key=cb460d7d9f6048f694671115241504&q=${lat},${lon}&aqi=no&lang=vi`
    )
  }

  getForecast(lat: number, lon: number, days = 7) {
    return this.Get<WeatherApiDataWithForecast>(
      `forecast.json?key=cb460d7d9f6048f694671115241504&q=${lat},${lon}&aqi=no&days=${days}&lang=vi`
    )
  }
}
