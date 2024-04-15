import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  uvlineContainer: {
    borderRadius: 16,
    marginTop: 12,
    marginBottom: 8,
    height: 4,
    minWidth: '100%',
  },
  uvLineInner: {
    borderRadius: 16,
    height: 4,
    width: '100%',
  },

  currentIndicator: {
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
