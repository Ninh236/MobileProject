import { RootState } from '@common/redux/stores'
import HistorySheet from '@components/HistorySheet'
import { Box, FlatList, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { styles } from './styles'

interface HistoryWeatherProps {
  isOpen: boolean
  onClose: () => void
  defaultDate?: string
}

export default function HistoryWeather(props: HistoryWeatherProps) {
  const { isOpen, onClose, defaultDate } = props
  const forecastData = useSelector(
    (state: RootState) => state.weatherReducer.forecastData
  )
  const [selectedDate, setSelectedDate] = useState<String>(
    defaultDate || (forecastData?.forecast.forecastday[0].date as String)
  )

  const handleClose = () => {
    setSelectedDate(forecastData?.forecast.forecastday[0].date as String)
    onClose()
  }

  return (
    <HistorySheet
      isOpen={isOpen}
      onClose={handleClose}
      title="Điều kiện thời tiết"
      iconName="cloud"
    >
      <FlatList
        style={styles.dateSelectContainer}
        data={forecastData?.forecast.forecastday}
        keyExtractor={(item) => item.date}
        removeClippedSubviews={true}
        legacyImplementation={false}
        horizontal={true}
        renderItem={({ item }) => (
          <Box key={item.date} style={styles.dateSelect}>
            <Text style={styles.dayText}>
              {new Date(item.date).toLocaleDateString('vi-VN', {
                weekday: 'narrow',
              })}
            </Text>
            <Text
              style={
                selectedDate == item.date
                  ? styles.selectedDate
                  : styles.dateSelectText
              }
              onPress={() => setSelectedDate(item.date)}
            >
              {new Date(item.date).getDate()}
            </Text>
          </Box>
        )}
      />
    </HistorySheet>
  )
}
