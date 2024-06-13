import {
  Box,
  Center,
  HStack,
  Icon,
  Image,
  Link,
  Text,
  VStack,
} from 'native-base'
import { styles } from './styles'
import { Condition, CurrentWeatherData } from '@common/types/current-data.type'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import { LocationData } from '@common/types/location-data.type'
import { ForecastDayDayData } from '@common/types/forecast-data.type'
import { useSelector } from 'react-redux'
import { RootState } from '@common/redux/stores'

interface CurrentWeatherProps {
  currentWeatherData: CurrentWeatherData
  currentLocation: LocationData
  daylyData: ForecastDayDayData
}

export default function CurrentWeather(props: CurrentWeatherProps) {
  const { currentWeatherData, currentLocation, daylyData } = props

  const selectedTemperature = useSelector(
    (state: RootState) => state.settingReducer.settings.temperatureUnit
  )

  return (
    <Box>
      <Center>
        <VStack space={2} alignItems="center" py={6}>
          <Text style={styles.locationText}>{currentLocation.name}</Text>
          <Text style={styles.currentDegree}>
            {'  '}
            {selectedTemperature != 'Fahrenheit'
              ? currentWeatherData.temp_c.toFixed(0)
              : currentWeatherData.temp_f.toFixed(0)}
            °
          </Text>
          <HStack alignItems="center" style={styles.conditionContainer}>
            <Image
              style={styles.conditionImage}
              source={{ uri: 'https:' + currentWeatherData.condition.icon }}
              alt="weather icon"
            />
            <Text style={styles.conditionText}>
              {currentWeatherData.condition.text}
            </Text>
          </HStack>
          <Text style={styles.tempDaylyText}>
            C:
            {selectedTemperature != 'Fahrenheit'
              ? daylyData.maxtemp_c.toFixed(0)
              : daylyData.maxtemp_f.toFixed(0)}
            ° T:
            {selectedTemperature != 'Fahrenheit'
              ? daylyData.mintemp_c.toFixed(0)
              : daylyData.mintemp_f.toFixed(0)}
            °
          </Text>
        </VStack>
      </Center>
    </Box>
  )
}
