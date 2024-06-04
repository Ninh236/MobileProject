import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  dateSelect: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
    height: 60,
  },

  dayText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
    color: 'white',
  },

  dateSelectContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },

  dateSelectText: {
    height: 30,
    width: 30,
    borderRadius: 25,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500',
    color: 'white',
  },

  selectedDate: {
    height: 30,
    width: 30,
    borderRadius: 25,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500',
    color: 'black',
    backgroundColor: '#3ABEF9',
  },
})
