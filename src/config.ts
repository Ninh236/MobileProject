export const config = {
  APP_NAME: 'WeatherForecast',
  BASE_API:
    process.env.REACT_APP_BASE_API_URL || 'http://api.weatherapi.com/v1',
  API_KEY: process.env.REACT_APP_API_KEY || '79dc1f33b30f4e5e9c8140152241306',
}
