import { Dimensions, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  homeViewStyles: {
    paddingTop: 64,
    paddingBottom: 84,
    paddingHorizontal: 16,
    backgroundColor: '#cccccc55',
    height: '100%',
    minHeight: Dimensions.get('window').height,
  },

  textStyles: {
    fontSize: 20,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    position: 'absolute',
    height: '100%',
    minHeight: Dimensions.get('window').height,
    minWidth: Dimensions.get('window').width,
    zIndex: -1,
  },
})
