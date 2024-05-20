import { StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export const styles = StyleSheet.create({
  viewStyles: {
    paddingTop: getStatusBarHeight(),
  },
  mapStyles: {
    width: '100%',
    height: '100%',
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  marker: {
    height: 48,
    width: 48,
  },
  weatherIcon: {
    height: 64,
    width: 64,
  },
  degreesText: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    paddingVertical: 2,
    marginTop: 4,
    paddingHorizontal: 5,
    borderRadius: 999,
    textAlign: 'center',
  },
  infoBox: {
    position: 'absolute',
    top: getStatusBarHeight(),
    width: '100%',
    height: 64,
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'row',
  },
  infoText: {
    color: 'white',
    fontSize: 20,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  secondaryText: {
    color: 'white',
  },
  temperatureBoxText: {
    paddingTop: 5,
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 40,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  weatherDetails: {
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
  },
})
