import { CurrentWeatherData } from '@common/types/current-data.type'
import Card from '@components/Card'
import { Box, Icon, Text } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { styles } from './styles'
import AirQualityLine from './components/AirQualityLine'

interface CurrentAirQualityProps {
  currentWeatherData: CurrentWeatherData
}

export default function CurrentAirQuality(props: CurrentAirQualityProps) {
  const { currentWeatherData } = props

  const airQualityDangerLevel = (airQuality: number) => {
    return airQuality < 35
      ? 'Tốt'
      : airQuality < 53
        ? 'Trung bình'
        : airQuality < 70
          ? 'Kém'
          : 'Rất kém'
  }

  return (
    <Card
      title="CHẤT LƯỢNG KHÔNG KHÍ"
      titleSize={'sm'}
      cardCustomStyles={styles.cardStyles}
      titleIcon={
        <Icon
          as={MaterialCommunityIcons}
          size={'md'}
          color="white"
          name="water"
          marginRight={2}
        />
      }
      body={
        <Box style={styles.bodyContainer}>
          <Text style={styles.airQualityValue}>
            {currentWeatherData.air_quality &&
              currentWeatherData.air_quality['gb-defra-index']}
          </Text>
          <Text style={styles.airQualityDangerLevel}>
            {airQualityDangerLevel(
              currentWeatherData.air_quality?.['gb-defra-index'] || 0
            )}
          </Text>
          <AirQualityLine
            currentAirQualityValue={currentWeatherData.air_quality}
          />
        </Box>
      }
    />
  )
}
