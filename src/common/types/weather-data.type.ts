export interface Coord {
  lat?: number
  lon?: number
}

export interface Main {
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  temp_min: number
  temp_max: number
  sea_level?: number
  grnd_level?: number
  temp_kf?: number
}

export interface Sys {
  type?: number
  id?: number
  message?: string | number
  country?: string
  sunrise?: number
  sunset?: number
}

export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

export interface Clouds {
  all?: number
}

export interface Wind {
  speed: number
  deg: number
  gust?: number
}

export interface Rain {
  '1h'?: number
  '3h'?: number
}

export interface Snow {
  '1h'?: number
  '3h'?: number
}

export interface WeatherData {
  id: number
  dt: number
  base: string
  coord: Coord
  main: Main
  name: string
  sys: Sys
  timezone: number
  visibility: number
  weather: Weather[]
  clouds?: Clouds
  wind?: Wind
  rain?: Rain
  snow?: Snow
  cod?: string | number
}
