import { Box, Text, View, Image } from 'native-base'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'

import { styles } from './styles'
import MapView, { Region } from 'react-native-maps'
import marker from '../../common/assets/marker.png'
import WeatherData from '@common/apis/weather-data.api'
import WeatherApi from '@common/apis/weatherapi.api'
import { AxiosError } from 'axios'

const latitudeDelta = 0.025
const longitudeDelta = 0.025

export default function MapScreen() {
  let [region, setRegion] = useState<Region | null>(null)
  let [temp, setTemp] = useState(0)

  useEffect(() => {
    void (async function () {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Permission to access location was denied')
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      const region: Region = {
        latitude: location?.coords.latitude || 0,
        longitude: location?.coords.longitude || 0,
        latitudeDelta,
        longitudeDelta,
      }
      setRegion(region)
    })()
  }, [])

  useEffect(() => {
    if (!region) return
    let api = new WeatherApi()
    api
      .getWeather(region?.latitude, region?.longitude)
      .then((r) => {
        setTemp(r.data.current.temp_c)
        console.log(r.data.current.temp_c)
        return
      })
      .catch((r) => {
        console.log(r['request'])
      })
  }, [region])

  return (
    <React.Fragment>
      <Box style={styles.viewStyles}>
        <MapView
          style={styles.mapStyles}
          region={region ?? undefined}
          onRegionChangeComplete={(region) => {
            console.log(region)
            setRegion(region)
          }}
        ></MapView>
        <View style={styles.markerFixed}>
          <Image style={styles.marker} source={marker} />
          <Text>{temp} degrees</Text>
        </View>
      </Box>
    </React.Fragment>
  )
}
