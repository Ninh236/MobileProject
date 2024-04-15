import compassArrow from '@common/assets/images/compass-arrow.png'
import compassBg from '@common/assets/images/compass-bg.png'
import { windDirectionToVN } from '@common/helpers/translate'
import { CurrentWeatherData } from '@common/types/current-data.type'
import { ForecastDayData } from '@common/types/forecast-data.type'
import Card from '@components/Card'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Box, Divider, HStack, Icon, Image, Text, VStack } from 'native-base'
import React from 'react'
import { styles } from './sryles'

interface CurrentWindProps {
  currentWeatherData: CurrentWeatherData
  forecastData: ForecastDayData
}

export default function CurrentWind(props: CurrentWindProps) {
  const { currentWeatherData } = props

  return (
    <Card
      title="GIÓ"
      titleSize={'sm'}
      cardCustomStyles={styles.cardStyles}
      titleIcon={
        <Icon
          as={MaterialCommunityIcons}
          size={'md'}
          color="white"
          name="weather-windy"
          marginRight={2}
        />
      }
      body={
        <Box style={styles.bodyContainer}>
          <HStack space={2}>
            <Box style={styles.windDetaiContainer}>
              <HStack style={styles.windTextContainer}>
                <Text style={styles.windDetailValue}>
                  {currentWeatherData.wind_kph.toFixed(0)}
                </Text>
                <VStack>
                  <Text style={styles.windDetailUnit}>km/h</Text>
                  <Text style={styles.windDetailLabel}>Gió</Text>
                </VStack>
              </HStack>
              <Divider style={styles.dividerStyle} />
              <HStack style={styles.gustTextContainer}>
                <Text style={styles.windDetailValue}>
                  {currentWeatherData.gust_kph.toFixed(0)}
                </Text>
                <VStack>
                  <Text style={styles.windDetailUnit}>km/h</Text>
                  <Text style={styles.windDetailLabel}>Gió giật</Text>
                </VStack>
              </HStack>
            </Box>
            <Box style={styles.compassContainer}>
              <Text style={styles.windDirectionText}>
                {windDirectionToVN(currentWeatherData.wind_dir)}
              </Text>
              <Box
                style={[
                  styles.compassArrowContainer,
                  {
                    transform: [
                      {
                        rotate: `${currentWeatherData.wind_degree}deg`,
                      },
                    ],
                  },
                ]}
              >
                <Image
                  source={compassArrow}
                  alt="compass"
                  style={styles.compassArrow}
                />
              </Box>
              <Image
                source={compassBg}
                alt="compass"
                style={styles.compassBg}
              />
            </Box>
          </HStack>
        </Box>
      }
    />
  )
}
