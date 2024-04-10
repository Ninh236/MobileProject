import {
  Clouds,
  Coord,
  Main,
  Rain,
  Snow,
  Weather,
  Wind,
} from './weather-data.type'

export interface List {
  dt: number
  main: Main
  weather: Weather[]
  clouds: Clouds
  wind: Wind
  visibility: number
  pop: number
  rain?: Rain
  snow?: Snow
  sys: {
    pod: string
  }
  dt_txt: string
}

export interface City {
  id: number
  name: string
  coord: Coord
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}

export interface ForecastData {
  city: City
  list: List[]
  message: string | number
  cnt: number
  cod: string | number
}
