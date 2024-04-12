import { Box, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location'

import { styles } from './styles'
import MapView from 'react-native-maps'

export default function MapScreen() {
  let [location, setLocation] = useState<Location.LocationObject | null>(null)

  useEffect(() => {
    void (async function () {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Permission to access location was denied')
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
      console.log(location)
    })()
  }, [])

  return (
    <React.Fragment>
      <Box style={styles.viewStyles}>
        <MapView style={styles.mapStyles} />
      </Box>
    </React.Fragment>
  )
}
