import Card from '@components/Card'
import React from 'react'
import { styles } from './styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Box, Icon, Text } from 'native-base'
import { CurrentWeatherData } from '@common/types/current-data.type'

interface CurrentVisibilityProps {
  currentWeatherData: CurrentWeatherData
}

export default function CurrentVisibility(props: CurrentVisibilityProps) {
  const { currentWeatherData } = props

  return (
    <Card
      title="TẦM NHÌN"
      titleSize={'sm'}
      cardCustomStyles={styles.cardStyles}
      titleIcon={
        <Icon
          as={MaterialCommunityIcons}
          size={'md'}
          color="white"
          name="eye"
          marginRight={2}
        />
      }
      body={
        <Box style={styles.bodyContainer}>
          <Text style={styles.visibilityValue}>
            {currentWeatherData.vis_km.toFixed(0)} km
          </Text>
          <Text style={styles.visibilitySummary}>
            Tầm nhìn{' '}
            {Number(currentWeatherData.vis_km.toFixed(0)) <= 1
              ? 'rất kém'
              : Number(currentWeatherData.vis_km.toFixed(0)) <= 5
                ? 'kém'
                : Number(currentWeatherData.vis_km.toFixed(0)) <= 10
                  ? 'trung bình'
                  : Number(currentWeatherData.vis_km.toFixed(0)) <= 15
                    ? ' rõ'
                    : 'hoàn toàn rõ'}
          </Text>
        </Box>
      }
    />
  )
}
