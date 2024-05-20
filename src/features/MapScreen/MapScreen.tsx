import { Box, Text, View, Image } from 'native-base'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'

import { styles } from './styles'
import MapView, { Region } from 'react-native-maps'
// @ts-ignore
import marker from '../../common/assets/marker.png'
import { InfoBox } from './components/InfoBox'

const latitudeDelta = 0.025
const longitudeDelta = 0.025

export default function MapScreen() {
  let [region, setRegion] = useState<Region | null>(null)
  let [loading, setLoading] = useState(false)

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

  return (
    <React.Fragment>
      <Box style={styles.viewStyles}>
        <InfoBox region={region ?? undefined} setLoading={setLoading} />
        <MapView
          style={styles.mapStyles}
          region={region ?? undefined}
          onRegionChangeComplete={(region) => {
            setRegion(region)
          }}
        ></MapView>
        <View style={styles.markerFixed}>
          <Image style={styles.marker} source={marker} alt="Marker" />
          <Box>
            {loading && (
              <>
                <Text style={styles.degreesText}>
                  {loading && 'Loading'}
                  {!loading && (region ? '' : 'Finding your location')}
                </Text>
              </>
            )}
          </Box>
        </View>
      </Box>
    </React.Fragment>
  )
}
