import { ForecastDayData } from '@common/types/forecast-data.type'
import Card from '@components/Card'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Box, Container, Divider, Icon, Text, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import HeatLine from './components/HeatLine'
import { styles } from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '@common/redux/stores'

export interface ForecastDaylyProps {
  forecastDaylyData: ForecastDayData[]
  currentTemp: number
}

export default function ForecastDayly(props: ForecastDaylyProps) {
  const { forecastDaylyData, currentTemp } = props
  const [weekMinTemp, setWeekMinTemp] = useState(0)
  const [weekMaxTemp, setWeekMaxTemp] = useState(0)

  const selectedTemperature = useSelector(
    (state: RootState) => state.settingReducer.settings.temperatureUnit
  )

  useEffect(() => {
    setWeekMinTemp(
      Math.min(
        ...forecastDaylyData.map((item) =>
          selectedTemperature != 'Fahrenheit'
            ? item.day.mintemp_c
            : item.day.mintemp_f
        )
      )
    )
    setWeekMaxTemp(
      Math.max(
        ...forecastDaylyData.map((item) =>
          selectedTemperature != 'Fahrenheit'
            ? item.day.maxtemp_c
            : item.day.maxtemp_f
        )
      )
    )
  }, [forecastDaylyData, selectedTemperature])

  return (
    <Card
      title="DỰ BÁO 7 NGÀY"
      titleSize={'sm'}
      titleIcon={
        <Icon
          as={MaterialCommunityIcons}
          size={'md'}
          color="white"
          name="calendar"
          marginRight={2}
        />
      }
      body={
        <VStack paddingTop={4}>
          {forecastDaylyData.map((item, index) => {
            return (
              <Box key={index}>
                <Divider style={styles.dividerStyle} />
                <Container style={styles.daylyForecastContainer}>
                  <Text style={styles.dateText}>
                    {index == 0
                      ? 'Hôm nay'
                      : new Date(item.date).toLocaleDateString('vi-VN', {
                          weekday: 'narrow',
                        })}
                  </Text>
                  <Box>
                    <Image
                      style={styles.daylyConditionImage}
                      source={{ uri: 'https:' + item.day.condition.icon }}
                      alt="weather icon"
                    />
                    {item.day.daily_chance_of_rain > 0 ? (
                      <Text style={styles.chanceText}>
                        {item.day.daily_chance_of_rain}%
                      </Text>
                    ) : item.day.daily_chance_of_snow > 0 ? (
                      <Text style={styles.chanceText}>
                        {item.day.daily_chance_of_snow}%
                      </Text>
                    ) : null}
                  </Box>
                  <Container style={styles.heatLineContainer}>
                    <Text style={styles.daylyTempMin}>
                      {selectedTemperature != 'Fahrenheit'
                        ? item.day.mintemp_c.toFixed(0)
                        : item.day.mintemp_f.toFixed(0)}
                      °
                    </Text>
                    {selectedTemperature != 'Fahrenheit' ? (
                      <HeatLine
                        isCurrentDay={index == 0}
                        currentTemp={Number(currentTemp.toFixed(0))}
                        weekMinTemp={Number(weekMinTemp.toFixed(0))}
                        weekMaxTemp={Number(weekMaxTemp.toFixed(0))}
                        minTemp={Number(item.day.mintemp_c.toFixed(0))}
                        maxTemp={Number(item.day.maxtemp_c.toFixed(0))}
                      />
                    ) : (
                      <HeatLine
                        isCurrentDay={index == 0}
                        currentTemp={Number(currentTemp.toFixed(0))}
                        weekMinTemp={Number(weekMinTemp.toFixed(0))}
                        weekMaxTemp={Number(weekMaxTemp.toFixed(0))}
                        minTemp={Number(item.day.mintemp_f.toFixed(0))}
                        maxTemp={Number(item.day.maxtemp_f.toFixed(0))}
                      />
                    )}
                    <Text style={styles.daylyTempMax}>
                      {selectedTemperature != 'Fahrenheit'
                        ? item.day.maxtemp_c.toFixed(0)
                        : item.day.maxtemp_f.toFixed(0)}
                      °
                    </Text>
                  </Container>
                </Container>
              </Box>
            )
          })}
        </VStack>
      }
    />
  )
}
