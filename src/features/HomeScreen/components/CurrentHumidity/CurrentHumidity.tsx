import { CurrentWeatherData } from '@common/types/current-data.type'
import Card from '@components/Card'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Box, Icon, Text } from 'native-base'
import React, { useEffect } from 'react'
import { styles } from './styles'
import { ForecastDayData } from '@common/types/forecast-data.type'

interface CurrentHumidityProps {
  currentWeatherData: CurrentWeatherData
  forecastData: ForecastDayData
}

export default function CurrentHumidity(props: CurrentHumidityProps) {
  const { currentWeatherData, forecastData } = props
  const [currentTimeEpoch, setCurrentTimeEpoch] = React.useState<number>(0)
  const [currentTimeIndex, setCurrentTimeIndex] = React.useState<number>(0)

  useEffect(() => {
    forecastData.hour.find((item, index) => {
      if (item.time_epoch > currentWeatherData.last_updated_epoch) {
        setCurrentTimeEpoch(forecastData.hour[index - 1].time_epoch)
        setCurrentTimeIndex(index - 1)
      }
      return item.time_epoch > currentWeatherData.last_updated_epoch
    })?.time_epoch
  }, [currentWeatherData, forecastData])

  return (
    currentWeatherData &&
    forecastData && (
      <Card
        title="ĐỘ ẨM"
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
            <Text style={styles.humidityValue}>
              {currentWeatherData.humidity}%
            </Text>
            <Text style={styles.dewpointText}>
              Điểm sương hiện tại:{' '}
              {forecastData.hour[currentTimeIndex].dewpoint_c.toFixed(0)}°C
            </Text>
          </Box>
        }
      />
    )
  )
}
