import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  hourlyTemp: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 140,
  },

  hourlyText: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500',
    color: 'white',
  },

  chanceText: {
    fontSize: 12,
    color: '#3ABEF9',
    lineHeight: 16,
    fontWeight: '500',
    position: 'absolute',
    left: 38,
    bottom: -4,
  },

  hourlyTempText: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500',
    color: 'white',
  },

  hourlyTempIcon: {
    width: 50,
    height: 50,
  },
})
