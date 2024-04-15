import { LinearGradient } from 'expo-linear-gradient'
import { Box } from 'native-base'
import React, { useEffect } from 'react'
import { styles } from './styles'

interface HeatLineProps {
  isCurrentDay: boolean
  currentTemp: number
  weekMinTemp: number
  weekMaxTemp: number
  minTemp: number
  maxTemp: number
}

export default function HeatLine(props: HeatLineProps) {
  const {
    isCurrentDay,
    currentTemp,
    weekMinTemp,
    weekMaxTemp,
    minTemp,
    maxTemp,
  } = props

  const [startColorValue, setStartColorValue] = React.useState('#00000000')
  const [endColorValue, setEndColorValue] = React.useState('#00000000')
  const [middleColorValue, setMiddleColorValue] = React.useState('#00000000')

  const setColorByTemp = (temp: number) => {
    return temp < 0
      ? '#0001ff'
      : temp < 10
        ? '#4bff00'
        : temp < 20
          ? '#feff00'
          : temp < 30
            ? '#ffaa00'
            : temp < 40
              ? '#ff6f00'
              : '#ff0000'
  }

  useEffect(() => {
    setStartColorValue(setColorByTemp(minTemp))
    setEndColorValue(setColorByTemp(maxTemp))
    setMiddleColorValue(setColorByTemp((minTemp + maxTemp) / 2))
  }, [])

  return minTemp && maxTemp && weekMinTemp && weekMaxTemp ? (
    <Box
      style={[
        styles.heatlineContainer,
        {
          paddingLeft:
            75 * ((minTemp - weekMinTemp) / (weekMaxTemp - weekMinTemp)),
          paddingRight:
            75 * ((weekMaxTemp - maxTemp) / (weekMaxTemp - weekMinTemp)),
        },
      ]}
    >
      <LinearGradient
        style={[
          styles.heatLineInner,
          {
            width:
              75 *
              (1 -
                (weekMaxTemp - maxTemp) / (weekMaxTemp - weekMinTemp) -
                (minTemp - weekMinTemp) / (weekMaxTemp - weekMinTemp)),
          },
        ]}
        start={{ x: -1, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[startColorValue, middleColorValue, endColorValue]}
      ></LinearGradient>
      {isCurrentDay && (
        <Box
          style={[
            styles.currentDayIndicator,
            {
              marginLeft:
                75 *
                  ((currentTemp - weekMinTemp) / (weekMaxTemp - weekMinTemp)) -
                5.5,
            },
          ]}
        />
      )}
    </Box>
  ) : (
    <Box style={styles.heatlineContainer} />
  )
}
