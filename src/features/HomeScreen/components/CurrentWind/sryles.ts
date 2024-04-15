import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  cardStyles: {
    minHeight: 150,
  },

  bodyContainer: {
    paddingTop: 8,
  },

  windDetaiContainer: {
    display: 'flex',
    flex: 1,
  },

  windTextContainer: {
    alignItems: 'center',
    height: 70,
    gap: 6,
  },

  gustTextContainer: {
    alignItems: 'center',
    height: 70,
    gap: 6,
  },

  windDetailValue: {
    fontSize: 40,
    lineHeight: 44,
    minWidth: 50,
    height: 40,
    fontWeight: '500',
    color: 'white',
    textAlign: 'right',
  },

  compassContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },

  windDirectionText: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '500',
    color: 'white',
    position: 'absolute',
  },

  windDetailLabel: {
    color: 'white',
  },

  windDetailUnit: {
    color: '#989898',
  },

  dividerStyle: {
    height: 1,
    backgroundColor: '#767676',
    marginVertical: 4.5,
  },

  compassArrowContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    alignItems: 'center',
  },

  compassBg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  compassArrow: {
    width: 12,
    height: 12,
  },
})
