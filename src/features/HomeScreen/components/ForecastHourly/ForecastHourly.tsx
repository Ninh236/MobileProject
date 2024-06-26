import { CurrentWeatherData } from '@common/types/current-data.type'
import {
  ForecastDayData,
  ForecastDayHourData,
} from '@common/types/forecast-data.type'
import Card from '@components/Card'
import {
  Box,
  FlatList,
  Hidden,
  HStack,
  Image,
  ScrollView,
  Spinner,
  Stack,
  Text,
  VStack,
} from 'native-base'
import React, { useEffect } from 'react'
import { styles } from './styles'

export interface ForecastHourlyProps {
  currentWeatherData: CurrentWeatherData
  forecastHourlyData: ForecastDayData[]
}

export default function ForecastHourly(props: ForecastHourlyProps) {
  const [currentTimeEpoch, setCurrentTimeEpoch] = React.useState<number>(0)
  const [currentTimeIndex, setCurrentTimeIndex] = React.useState<number>(0)
  const { forecastHourlyData, currentWeatherData } = props

  useEffect(() => {
    forecastHourlyData[0].hour
      .concat(forecastHourlyData[1].hour)
      .find((item, index) => {
        if (item.time_epoch > currentWeatherData.last_updated_epoch) {
          setCurrentTimeEpoch(forecastHourlyData[0].hour[index - 1].time_epoch)
          setCurrentTimeIndex(index - 1)
        }
        return item.time_epoch > currentWeatherData.last_updated_epoch
      })
  }, [currentWeatherData, forecastHourlyData])

  return (
    <React.Fragment>
      <Card
        body={
          currentTimeEpoch != 0 ? (
            <FlatList
              data={forecastHourlyData[0].hour
                .concat(forecastHourlyData[1].hour)
                .filter(
                  (item, index) =>
                    item.time_epoch >= currentTimeEpoch &&
                    index < 24 + currentTimeIndex
                )}
              keyExtractor={(item: ForecastDayHourData) =>
                item.time_epoch.toString()
              }
              removeClippedSubviews={true}
              legacyImplementation={false}
              renderItem={({ item }) => (
                <Box
                  key={item.time_epoch}
                  style={styles.hourlyTemp}
                  position={
                    currentTimeEpoch == item.time_epoch ? 'sticky' : 'relative'
                  }
                  left={currentTimeEpoch == item.time_epoch ? 0 : 'unset'}
                >
                  <Text style={styles.hourlyText}>
                    {currentTimeEpoch == item.time_epoch
                      ? 'Bây giờ'
                      : new Date(item.time_epoch * 1000).getHours() + ' giờ'}
                  </Text>
                  <Image
                    source={{ uri: 'https:' + item.condition.icon }}
                    style={styles.hourlyTempIcon}
                    alt="weather icon"
                  />
                  <Text style={styles.hourlyTempText}>
                    {item.temp_c.toFixed(0) + '°'}
                  </Text>
                </Box>
              )}
              horizontal
            />
          ) : (
            <Box
              height={140}
              width="full"
              alignItems="center"
              justifyContent="center"
              display="flex"
            >
              <Spinner size="lg" color="gray.300" />
            </Box>
          )
        }
      />
    </React.Fragment>
  )
}
