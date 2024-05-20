import { Box, Button, FlatList, Text, View } from 'native-base'
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
  let [forecastOpen, setForecastOpen] = useState(false)

  useEffect(() => {
    if (!region) {
      return
    }

    setLoading?.(true)
    setWeatherLoading(true)
    let api = new WeatherApi()
    api
      .getForecast(region?.latitude, region?.longitude)
      .then((r) => {
        setCurrent(r.data)
        console.log(r.data)
        return
      })
      .catch((r) => {
        console.log(r['request'])
      })
      .finally(() => {
        setLoading?.(false)
        setWeatherLoading(false)
      })
  }, [region])

  return (
    <>
      <View style={styles.infoBox}>
        <View style={styles.weatherDetails}>
          <Box>
            <Text style={styles.temperatureBoxText}>
              {r?.current.temp_c} °C
            </Text>
          </Box>

          <Box
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Text style={styles.infoText}>
              {region
                ? weatherLoading
                  ? 'Loading weather info...'
                  : r?.current.condition.text
                : 'Waiting for location...'}
            </Text>
            <Text style={styles.secondaryText}>
              Feels like {Math.floor(r?.current.feelslike_c || 0)} °C
            </Text>
          </Box>

          {!!r && (
            <Box>
              <Button
                style={{
                  ...styles.forecastButton,
                  backgroundColor: forecastOpen
                    ? 'rgba(255, 255, 0, 0.4)'
                    : 'transparent',
                }}
                onPress={() => {
                  setForecastOpen(!forecastOpen)
                }}
              >
                <Text style={styles.forecastButtonText}>Tomorrow</Text>
                <Text style={styles.forecastButtonTemp}>
                  {Math.floor(r?.forecast?.forecastday?.[1].day.avgtemp_c)} °C
                </Text>
              </Button>
            </Box>
          )}
        </View>
        <WeatherIcon
          imageUrl={`https:${r?.current.condition.icon}`}
          style={styles.weatherIcon}
          alt={r?.current.condition.text || ''}
        />
      </View>
      {forecastOpen && r?.forecast && (
        <>
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
                let d = `${time.getDate()}/${time.getMonth()}`

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
        </>
      )}
    </>
  )
}
