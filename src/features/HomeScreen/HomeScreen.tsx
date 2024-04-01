import { StackNavigation } from '@common/router'
import { useNavigation } from '@react-navigation/native'
import { Button, Text, View } from 'react-native'
import { styles } from './styles'

export default function HomeScreen() {
  const { navigate } = useNavigation<StackNavigation>()

  const handleButtonPress = () => {
    navigate('SecondScreen')
  }

  return (
    <View>
      <Text style={styles.textStyle}>Home Screen</Text>
      <Button title="To Second Screen" onPress={handleButtonPress} />
    </View>
  )
}
