export interface WeatherApiData {
  location: WeatherApiLocation
  current: WeatherApiCurrent
}

export interface WeatherApiLocation {
  lat: number
  lon: number
}

export interface WeatherApiCurrent {
  temp_c: number
}
