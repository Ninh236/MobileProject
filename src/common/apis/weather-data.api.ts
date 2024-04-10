import baseApi from '@common/core/base-api'
import { config } from 'config'
import { WeatherData as WeatherDataType } from '@common/types/weather-data.type'
import { ForecastData as ForecastDataType } from '@common/types/forecast-data.type'

export default class WeatherData extends baseApi {
  protected prefix: string = 'data/2.5'

  getWeather(lat: number, lon: number) {
    return this.Get<WeatherDataType>(
      `weather?lat=${lat}&lon=${lon}&appid=${config.API_KEY}&lang=vi`
    )
  }

  getForecast(lat: number, lon: number) {
    return this.Get<ForecastDataType>(
      `forecast?lat=${lat}&lon=${lon}&appid=${config.API_KEY}&lang=vi`
    )
  }
}
