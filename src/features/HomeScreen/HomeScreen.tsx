import Api from '@common/apis/Api'
import staryNight from '@common/assets/images/stary-night.jpg'
import { weatherReducerCase } from '@common/redux/reducers/weather.reducer'
import { RootState } from '@common/redux/stores'
import * as Location from 'expo-location'
import { Box, HStack, ScrollView, Spinner, Stack, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { ImageBackground, ImageSourcePropType } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CurrentVisibility from './components/CurremtVisibility'
import CurrentAirQuality from './components/CurrentAirQuality'
import CurrentFeelLike from './components/CurrentFeelLike'
import CurrentHumidity from './components/CurrentHumidity'
import CurrentPrecipitation from './components/CurrentPrecipitation'
import CurrentPressure from './components/CurrentPressure'
import CurrentUV from './components/CurrentUV'
import CurrentWeather from './components/CurrentWeather'
import CurrentWind from './components/CurrentWind'
import ForecastDayly from './components/ForecastDayly'
import ForecastHourly from './components/ForecastHourly'
import { styles } from './styles'

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const dispatch = useDispatch()

  const weatherData = useSelector(
    (state: RootState) => state.weatherReducer.currentWeatherData
  )
  const forecastData = useSelector(
    (state: RootState) => state.weatherReducer.forecastData
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
    if (location) {
      console.log(
        'getting current weather data at',
        location?.coords.latitude,
        location?.coords.longitude
      )
      Api.getInstance()
        .weatherData.getCurrentWeather(
          location?.coords.latitude,
          location?.coords.longitude
        )
        .then((res) => {
          console.log('current', JSON.stringify(res.data))
          dispatch({
            type: weatherReducerCase.setCurrentWeatherData,
            payload: res.data,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [location])

  useEffect(() => {
    if (location) {
      console.log(
        'getting forecast weather data at',
        location?.coords.latitude,
        location?.coords.longitude
      )
      Api.getInstance()
        .weatherData.getForecastWeather(
          location?.coords.latitude,
          location?.coords.longitude,
          7
        )
        .then((res) => {
          console.log('forecast', JSON.stringify(res.data))
          dispatch({
            type: weatherReducerCase.setForecastData,
            payload: res.data,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [location])

  return (
    <React.Fragment>
      <ScrollView>
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
                  <CurrentPrecipitation
                    currentWeatherData={weatherData.current}
                  />
                </HStack>
                {weatherData.current.air_quality && (
                  <CurrentAirQuality currentWeatherData={weatherData.current} />
                )}
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
      </ScrollView>
      <ImageBackground
        source={staryNight as ImageSourcePropType}
        style={styles.backgroundImage}
      ></ImageBackground>
    </React.Fragment>
  )
}
