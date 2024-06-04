import React from 'react'
import { Box, Button, FlatList, Slide, Text, View } from 'native-base'
import { styles } from './styles'
import { WeatherIcon } from '@components/WeatherIcon'
import {
  WeatherApiData,
  WeatherApiDataWithForecast,
} from '@common/types/weatherapi-data.type'
import { useEffect, useState } from 'react'
import { Region } from 'react-native-maps'
import WeatherApi from '@common/apis/weatherapi.api'

interface IProps {
  region?: Region
  setLoading?: (b: boolean) => void
}

export function InfoBox({ region, setLoading }: IProps) {
  let [r, setCurrent] = useState<WeatherApiDataWithForecast | null>(null)
  let [weatherLoading, setWeatherLoading] = useState(false)

  useEffect(() => {
    if (!region) {
      return
    }

    console.log(region.latitude, region.longitude)

    setLoading?.(true)
    setWeatherLoading(true)
    let api = new WeatherApi()
    api
      .getForecast(region?.latitude, region?.longitude)
      .then((r) => {
        let d = r.data
        let days = d.forecast.forecastday
        let index = days.findIndex((r) => r.date_epoch < +new Date())
        d.forecast.forecastday = days.slice(index + 1)
        setCurrent(d)
        return
      })
      .catch((r) => {
        console.log(r['request'])
      })
      .finally(() => {
        setLoading?.(false)
        setWeatherLoading(false)
      })
  }, [region?.latitude.toFixed(2), region?.longitude.toFixed(2)])

  let hasWeather = !weatherLoading && region

  return (
    <>
      <View style={styles.infoBox}>
        <View style={styles.weatherDetails}>
          {hasWeather && (
            <Box>
              <Text style={styles.temperatureBoxText}>
                {Math.floor(r?.current.temp_c || 0)} °C
              </Text>
            </Box>
          )}

          <Box
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                ...styles.infoText,
                textAlign: weatherLoading ? 'center' : 'left',
                width: weatherLoading ? '100%' : undefined,
              }}
            >
              {region
                ? weatherLoading
                  ? 'Đang tải...'
                  : r?.current.condition.text
                : 'Đang định vị...'}
            </Text>
            {hasWeather && (
              <Text style={styles.secondaryText}>
                Cảm giác {Math.floor(r?.current.feelslike_c || 0)} °C
              </Text>
            )}
          </Box>

          {!!r && (
            <Box>
              <Button style={styles.forecastButton}>
                <Text style={styles.forecastButtonText}>Ngày mai</Text>
                <Text style={styles.forecastButtonTemp}>
                  {Math.floor(r?.forecast?.forecastday?.[1].day.avgtemp_c)} °C
                </Text>
              </Button>
            </Box>
          )}
        </View>
        {hasWeather && (
          <WeatherIcon
            imageUrl={`https:${r?.current.condition.icon}`}
            style={styles.weatherIcon}
            alt={r?.current.condition.text || ''}
          />
        )}
      </View>
      {true && (
        <Slide in={!!r?.forecast} placement="top" duration={100}>
          <View style={styles.forecastBox}>
            <FlatList
              data={r?.forecast.forecastday ?? []}
              horizontal
              renderItem={(i) => {
                let { item } = i
                let { icon, text } = item.day.condition
                let boxStyles = { ...styles.forecastDayBox }
                if (!i.index) boxStyles.marginLeft = 10

                let time = new Date(item.date_epoch * 1000)
                let d = `${time.getDate()}/${time.getMonth() + 1}`

                return (
                  <>
                    <Box style={boxStyles}>
                      <Text style={styles.forecastDayDate}>{d}</Text>
                      <WeatherIcon
                        imageUrl={`https:${icon}`}
                        style={{
                          ...styles.weatherIcon,
                          height: 32,
                          width: 32,
                        }}
                        alt={text}
                      />
                      <Text style={styles.forecastDayText} numberOfLines={1}>
                        {text}
                      </Text>
                      <Text style={styles.forecastDayTemp}>
                        {Math.floor(item.day.avgtemp_c)} °C
                      </Text>
                    </Box>
                  </>
                )
              }}
              keyExtractor={(r) => r.date_epoch.toString()}
            />
          </View>
        </Slide>
      )}
    </>
  )
}
