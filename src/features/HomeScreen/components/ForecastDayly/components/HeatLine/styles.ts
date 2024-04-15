import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  heatlineContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 16,
    height: 4,
    minWidth: 75,
  },
  heatLineInner: {
    borderRadius: 16,
    height: 4,
    width: 75,
  },

  currentDayIndicator: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    marginVertical: -2,
    height: 8,
    width: 8,
  },
})
