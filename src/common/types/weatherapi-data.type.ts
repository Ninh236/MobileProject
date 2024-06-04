export interface WeatherApiData {
  location: WeatherApiLocation
  current: WeatherApiCurrent
}

export interface WeatherApiLocation {
  lat: number
  lon: number
  country: string
  localtime: string
  localtime_epoch: number
  name: string
}

export interface WeatherApiCurrent {
  temp_c: number
  cloud: number
  condition: WeatherApiCondition
  feelslike_c: number
}

export interface WeatherApiCondition {
  code: number
  icon: string
  text: string
}

export interface WeatherApiDataWithForecast extends WeatherApiData {
  forecast: {
    forecastday: WeatherApiForecastDay[]
  }
}

export interface WeatherApiForecastDay {
  date: string
  date_epoch: number
  day: {
    condition: WeatherApiCondition
    maxtemp_c: number
    mintemp_c: number
    avgtemp_c: number
    hour: {
      time_epoch: number
      time: string
      temp_c: number
      condition: WeatherApiCondition
      feelslike_c: number
    }[]
  }
}
