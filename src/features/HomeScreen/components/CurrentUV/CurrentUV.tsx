import { CurrentWeatherData } from '@common/types/current-data.type'
import Card from '@components/Card'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Box, Icon, Text } from 'native-base'
import React from 'react'
import UVLine from './components/UVLine'
import { styles } from './styles'

interface CurrentUVProps {
  currentWeatherData: CurrentWeatherData
}

export default function CurrentUV(props: CurrentUVProps) {
  const { currentWeatherData } = props

  const uvDangerLevel = (uv: number) => {
    return uv < 3
      ? 'Thấp'
      : uv < 6
        ? 'Trung bình'
        : uv < 8
          ? 'Cao'
          : uv < 11
            ? 'Rất cao'
            : 'Cực cao'
  }

  return (
    <Card
      title="CHỈ SỐ UV"
      titleSize={'sm'}
      cardCustomStyles={styles.cardStyles}
      titleIcon={
        <Icon
          as={MaterialCommunityIcons}
          size={'md'}
          color="white"
          name="white-balance-sunny"
          marginRight={2}
        />
      }
      body={
        <Box style={styles.bodyContainer}>
          <Text style={styles.uvValue}>{currentWeatherData.uv}</Text>
          <Text style={styles.uvDangerLevel}>
            {uvDangerLevel(currentWeatherData.uv)}
          </Text>
          <UVLine currentUVValue={currentWeatherData.uv} />
        </Box>
      }
    />
  )
}
