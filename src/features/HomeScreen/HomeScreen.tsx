import Api from '@common/apis/Api'
import staryNight from '@common/assets/images/stary-night.jpg'
import { CurrentWeatherDataResponse } from '@common/types/current-data.type'
import { ForecastDataResponse } from '@common/types/forecast-data.type'
import * as Location from 'expo-location'
import { Box, HStack, ScrollView, Spinner, Stack, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { ImageBackground, ImageSourcePropType } from 'react-native'
import CurrentVisibility from './components/CurremtVisibility'
import CurrentFeelLike from './components/CurrentFeelLike'
import CurrentHumidity from './components/CurrentHumidity'
import CurrentPressure from './components/CurrentPressure'
import CurrentUV from './components/CurrentUV'
import CurrentWeather from './components/CurrentWeather'
import CurrentWind from './components/CurrentWind'
import ForecastDayly from './components/ForecastDayly'
import ForecastHourly from './components/ForecastHourly'
import { styles } from './styles'

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [weatherData, setWeatherData] =
    useState<CurrentWeatherDataResponse | null>(null)
  const [forecastData, setForecastData] = useState<ForecastDataResponse | null>(
    null
  )
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
      console.log(status)
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

  useEffect(() => {
    location &&
      Api.getInstance()
        .weatherData.getCurrentWeather(
          location?.coords.latitude,
          location?.coords.longitude
        )
        .then((res) => {
          console.log('current', JSON.stringify(res.data))
          setWeatherData(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
  }, [location])

  useEffect(() => {
    location &&
      Api.getInstance()
        .weatherData.getForecast(
          location?.coords.latitude,
          location?.coords.longitude,
          7
        )
        .then((res) => {
          console.log('forecast', JSON.stringify(res.data))
          setForecastData(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
  }, [location])

  return (
    <ScrollView>
      <ImageBackground
        source={staryNight as ImageSourcePropType}
        style={styles.backgroundImage}
      >
        <Box style={styles.homeViewStyles}>
          {weatherData && forecastData ? (
            <VStack>
              <CurrentWeather
                currentWeatherData={weatherData.current}
                daylyData={forecastData.forecast.forecastday[0].day}
                currentLocation={weatherData.location}
              />
              <VStack space={4}>
                <ForecastHourly
                  currentWeatherData={forecastData.current}
                  forecastHourlyData={forecastData.forecast.forecastday}
                />
                <ForecastDayly
                  forecastDaylyData={forecastData.forecast.forecastday}
                  currentTemp={weatherData.current.temp_c}
                />
                <HStack space={4}>
                  <CurrentHumidity
                    currentWeatherData={weatherData.current}
                    forecastData={forecastData.forecast.forecastday[0]}
                  />
                  <CurrentUV currentWeatherData={weatherData.current} />
                </HStack>
                <CurrentWind
                  currentWeatherData={weatherData.current}
                  forecastData={forecastData.forecast.forecastday[0]}
                />
                <HStack space={4}>
                  <CurrentFeelLike currentWeatherData={weatherData.current} />
                  <CurrentPressure
                    currentWeatherData={weatherData.current}
                    forecastData={forecastData.forecast.forecastday}
                  />
                </HStack>
                <HStack space={4}>
                  <CurrentVisibility currentWeatherData={weatherData.current} />
                </HStack>
              </VStack>
            </VStack>
          ) : (
            <Stack
              height="100%"
              justifyContent="center"
              alignItems="center"
              display="flex"
            >
              <Spinner size="lg" color="gray.300" />
            </Stack>
          )}
        </Box>
      </ImageBackground>
    </ScrollView>
  )
}
