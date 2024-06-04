import { Box, Text, View, Image } from 'native-base'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import * as Location from 'expo-location'

import { styles } from './styles'
import MapView, { Region } from 'react-native-maps'
// @ts-ignore
import marker from '../../common/assets/marker.png'
import { InfoBox } from './components/InfoBox'
import { useDispatch, useSelector } from 'react-redux'
import { mapReducerCase } from '@common/redux/reducers/map.reducer'
import { RootState } from '@common/redux/stores'

const latitudeDelta = 0.025
const longitudeDelta = 0.025

export default function MapScreen() {
  let dispatch = useDispatch()
  let region = useSelector((r: RootState) => r.mapReducer.region)
  let [loading, setLoading] = useState(false)

  const setRegion = useMemo(() => {
    return (region: Region) => {
      dispatch({
        type: mapReducerCase.region,
        payload: region,
      })
    }
  }, [dispatch])

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
