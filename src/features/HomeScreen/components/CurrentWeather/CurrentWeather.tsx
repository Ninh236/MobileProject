import { Box, Center, HStack, Skeleton, Text, VStack } from 'native-base'
import { styles } from './styles'
import { kelvinToCelsius } from '@common/helpers/convert-unit'

interface CurrentWeatherProps {
  location: string
  temp: number
}

export default function CurrentWeather(props: CurrentWeatherProps) {
  const { location, temp } = props

  return (
    <Box>
      <Center>
        <VStack space={2} alignItems="center" py={6}>
          <Text style={styles.locationText}>{location}</Text>
          <Text style={styles.currentDegree} rounded={8}>
            {kelvinToCelsius(temp).toFixed(1)}
            <Text style={{ position: 'absolute' }}>°</Text>
          </Text>
        </VStack>
      </Center>
    </Box>
  )
}
