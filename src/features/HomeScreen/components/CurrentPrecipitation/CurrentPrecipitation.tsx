import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { styles } from './styles'
import Card from '@components/Card'
import { Box, Icon, Text } from 'native-base'
import { CurrentWeatherData } from '@common/types/current-data.type'

interface CurrentPrecipitationProps {
  currentWeatherData: CurrentWeatherData
}

export default function CurrentPrecipitation(props: CurrentPrecipitationProps) {
  const { currentWeatherData } = props

  return (
    <Card
      title="LƯỢNG MƯA"
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
          <Text style={styles.precipitationValue}>
            {currentWeatherData.precip_mm} mm
          </Text>
          <Text style={styles.precipitationSummary}>trong 24 giờ qua</Text>
        </Box>
      }
    />
  )
}
