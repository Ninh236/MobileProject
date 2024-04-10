import Card from '@components/Card'
import { Box, Spinner, Stack } from 'native-base'
import React, { useEffect, useState } from 'react'
import CurrentWeather from './components/CurrentWeather'
import { styles } from './styles'
import * as Location from 'expo-location'
import Api from '@common/apis/Api'
import { WeatherData } from '@common/types/weather-data.type'
import { mockForecastData, mockWeatherData } from './mockData'
import { ForecastData } from '@common/types/forecast-data.type'

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [forecastData, setForecastData] = useState<ForecastData | null>(null)
  const [foregroundPermissionAsync, setForegroundPermissionAsync] =
    useState<Location.PermissionStatus | null>(null)
  const [backgroundPermissionAsync, setBackgroundPermissionAsync] =
    useState<Location.PermissionStatus | null>(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        return
      }
      setForegroundPermissionAsync(status)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestBackgroundPermissionsAsync()
      if (status !== 'granted') {
        return
      }
      setBackgroundPermissionAsync(status)
    })()
  }, [])

  useEffect(() => {
    if (
      foregroundPermissionAsync === 'granted' ||
      (backgroundPermissionAsync === 'granted' && !location)
    ) {
      ;(async () => {
        const currentLocation = await Location.getCurrentPositionAsync({})
        setLocation(currentLocation)
      })()
    }
  }, [foregroundPermissionAsync, backgroundPermissionAsync])

  //useEffect(() => {
  //  location && Api.getInstance().weatherData.getWeather(location?.coords.latitude, location?.coords.longitude)
  //    .then((res) => {
  //      console.log("current", JSON.stringify(res.data))
  //      setWeatherData(res.data)
  //    }).catch((err) => {
  //      console.log(err)
  //    })
  //}, [location])

  // Mock data for testing, uncomment the above useEffect to fetch real data

  useEffect(() => {
    setWeatherData(mockWeatherData)
  }, [])

  //useEffect(() => {
  //  location && Api.getInstance().weatherData.getForecast(location?.coords.latitude, location?.coords.longitude)
  //    .then((res) => {
  //      console.log("forcast", JSON.stringify(res.data))
  //      setForecastData(res.data)
  //    }).catch((err) => {
  //      console.log(err)
  //    })
  //}, [location])

  // Mock data for testing, uncomment the above useEffect to fetch real data

  useEffect(() => {
    setForecastData(mockForecastData)
  }, [])

  return (
    <React.Fragment>
      <Box style={styles.homeViewStyles}>
        {weatherData ? (
          <Stack>
            <CurrentWeather
              location={weatherData.name}
              temp={weatherData.main.temp}
            />
            <Card title={'title'} body={<></>} />
          </Stack>
        ) : (
          <Stack
            height="100%"
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            <Spinner size="lg" />
          </Stack>
        )}
      </Box>
    </React.Fragment>
  )
}
