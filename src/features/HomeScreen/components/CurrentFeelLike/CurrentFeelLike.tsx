import Card from '@components/Card'
import React from 'react'
import { styles } from './styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Box, Icon, Text } from 'native-base'
import { CurrentWeatherData } from '@common/types/current-data.type'

interface CurrentFeelLikeProps {
  currentWeatherData: CurrentWeatherData
}

export default function CurrentFeelLike(props: CurrentFeelLikeProps) {
  const { currentWeatherData } = props

  return (
    <Card
      title="CẢM NHẬN"
      titleSize={'sm'}
      cardCustomStyles={styles.cardStyles}
      titleIcon={
        <Icon
          as={MaterialCommunityIcons}
          size={'md'}
          color="white"
          name="thermometer"
          marginRight={2}
        />
      }
      body={
        <Box style={styles.bodyContainer}>
          <Text style={styles.feelLikeValue}>
            {currentWeatherData.feelslike_c.toFixed(0)}°
          </Text>
          <Text style={styles.feelLikeSummary}>
            Cảm nhận
            {currentWeatherData.feelslike_c.toFixed(0) ==
            currentWeatherData.temp_c.toFixed(0)
              ? ' giống với '
              : currentWeatherData.feelslike_c.toFixed(0) >
                  currentWeatherData.temp_c.toFixed(0)
                ? ' cao hơn '
                : ' thấp hơn '}
            nhiệt độ thực tế
          </Text>
        </Box>
      }
    />
  )
}
