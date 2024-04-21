import { LinearGradient } from 'expo-linear-gradient'
import { Box } from 'native-base'
import React from 'react'
import { styles } from './styles'
import { AirQualityData } from '@common/types/air-quality.type'

interface AirQualityLineProps {
  currentAirQualityValue?: AirQualityData
}

export default function AirQualityLine(props: AirQualityLineProps) {
  const { currentAirQualityValue } = props

  return (
    currentAirQualityValue && (
      <Box style={[styles.uvlineContainer]}>
        <LinearGradient
          style={[styles.uvLineInner]}
          start={{ x: -1, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0.6, 0.7, 0.8, 0.9, 1]}
          colors={['#66ff00', '#ffcc00', '#ff8800', '#ff0000', '#6600ff']}
        ></LinearGradient>
        <Box
          style={[
            styles.currentIndicator,
            {
              left: `${Math.min((currentAirQualityValue?.['gb-defra-index'] / 70) * 100, 100)}%`,
            },
          ]}
        />
      </Box>
    )
  )
}
