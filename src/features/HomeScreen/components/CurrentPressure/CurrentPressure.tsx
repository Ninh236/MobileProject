import { CurrentWeatherData } from '@common/types/current-data.type'
import { ForecastDayData } from '@common/types/forecast-data.type'
import Card from '@components/Card'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Box, Icon, Text, VStack } from 'native-base'
import React from 'react'
import { styles } from './styles'
import MessureCircleSVG from './components/MessureCircleSVG'

interface CurrentPressureProps {
  currentWeatherData: CurrentWeatherData
  forecastData: ForecastDayData[]
}

export default function CurrentPressure(props: CurrentPressureProps) {
  const { currentWeatherData, forecastData } = props

  const pressureTrend = () => {
    const nextPressure = forecastData[0].hour.concat(forecastData[1].hour).at(
      forecastData[0].hour.concat(forecastData[1].hour).findIndex((data) => {
        return data.time_epoch >= currentWeatherData.last_updated_epoch
      })
    )?.pressure_mb

    return nextPressure
      ? nextPressure > currentWeatherData.pressure_mb
        ? 'arrow-up'
        : nextPressure < currentWeatherData.pressure_mb
          ? 'arrow-down'
          : nextPressure == currentWeatherData.pressure_mb
            ? 'equal'
            : 'equal'
      : 'equal'
  }

  return (
    <Card
      title="ÁP SUẤT"
      titleSize={'sm'}
      cardCustomStyles={styles.cardStyles}
      titleIcon={
        <Icon
          as={MaterialCommunityIcons}
          size={'md'}
          color="white"
          name="speedometer-medium"
          marginRight={2}
        />
      }
      body={
        <Box style={styles.bodyContainer}>
          <MessureCircleSVG width="100%" height={150} position="absolute" />
          <VStack alignItems="center" justifyContent="center">
            <Icon
              as={MaterialCommunityIcons}
              size={'lg'}
              color="white"
              name={pressureTrend()}
            />
            <Text style={styles.pressureValue}>
              {currentWeatherData.pressure_mb.toFixed(0)}
            </Text>
            <Text style={styles.pressureUnit}>hPa</Text>
          </VStack>
        </Box>
      }
    />
  )
}
