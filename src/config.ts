export const config = {
  APP_NAME: 'WeatherForecast',
  BASE_API:
    process.env.REACT_APP_BASE_API_URL || 'http://api.weatherapi.com/v1',
  API_KEY: process.env.REACT_APP_API_KEY || 'aabe9ac76e3a45a881024420241104',
}
