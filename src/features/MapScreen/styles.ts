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
})
