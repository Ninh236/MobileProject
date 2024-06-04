import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  dateText: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500',
    padding: 10,
    color: 'white',
    minWidth: 96,
  },

  chanceText: {
    fontSize: 12,
    color: '#3ABEF9',
    lineHeight: 16,
    fontWeight: '500',
    position: 'absolute',
    left: 38,
    bottom: -2,
  },

  daylyTempMax: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500',
    color: 'white',
  },

  daylyTempMin: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500',
    color: '#DADADA',
  },

  heatLineContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 8,
  },

  daylyForecastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  daylyConditionImage: {
    width: 50,
    height: 50,
  },

  dividerStyle: {
    height: 1,
    backgroundColor: '#767676',
    alignSelf: 'center',
  },
})
