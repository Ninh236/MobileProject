import { config } from 'config'
import WeatherData from './weather-data.api'

export default class Api {
  private static _instance: Api

  public weatherData: WeatherData = new WeatherData(config.BASE_API)

  public static getInstance(): Api {
    if (!this._instance) this._instance = new Api()
    return this._instance
  }
}
