import React, { useEffect, useState } from 'react'
import {
  Box,
  Switch,
  Text,
  Select,
  CheckIcon,
  Heading,
  Divider,
  FlatList,
  VStack,
  Button,
} from 'native-base'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { useDispatch, useSelector } from 'react-redux'
import { settingReducerCase } from '@common/redux/reducers/setting.reducer'
import { RootState } from '@common/redux/stores'
import { Settings } from '@common/types/settings.type'
import { styles } from './styles'
import { schedulePushNotification } from '@features/Notification/Notifications'

interface SettingOption {
  key: string
  label: string
  type: 'select' | 'switch' | 'text'
  options?: string[]
}

const settingOptions: SettingOption[] = [
  {
    key: 'temperatureUnit',
    label: 'Đơn vị nhiệt độ',
    type: 'select',
    options: ['Celsius', 'Fahrenheit'],
  },
  {
    key: 'windSpeedUnit',
    label: 'Đơn vị tốc độ gió',
    type: 'select',
    options: ['km/h', 'mph'],
  },
  {
    key: 'pressureUnit',
    label: 'Đơn vị áp suất',
    type: 'select',
    options: ['hPa', 'mmHg'],
  },
  {
    key: 'notificationCurrentConditions',
    label: 'Thông báo - Thời tiết hiện tại',
    type: 'switch',
  },
  {
    key: 'warningNotifications',
    label: 'Cảnh báo thời tiết',
    type: 'switch',
  },
  {
    key: 'hurricaneNotifications',
    label: 'Cảnh báo bão',
    type: 'switch',
  },
  {
    key: 'lightningNotifications',
    label: 'Cảnh báo sét',
    type: 'switch',
  },
  {
    key: 'weatherUpdateRate',
    label: 'Tần suất cập nhật thời tiết',
    type: 'select',
    options: ['15 phút', '30 phút', '1 giờ'],
  },
]

const SettingScreen: React.FC = () => {
  const [settings, setSettings] = useState<Partial<Settings>>({
    temperatureUnit: 'Celsius',
    windSpeedUnit: 'km/h',
    pressureUnit: 'hPa',
    timeFormat: '24h',
    notificationCurrentConditions: false,
    warningNotifications: false,
    hurricaneNotifications: false,
    lightningNotifications: false,
    weatherUpdateRate: '30min',
  })

  const dispatch = useDispatch()
  const selector = useSelector((r: RootState) => r.settingReducer.settings)

  const currentWeather = useSelector(
    (state: RootState) => state.weatherReducer.currentWeatherData
  )
  const forecastWeather = useSelector(
    (state: RootState) => state.weatherReducer.forecastData
  )

  useEffect(() => {
    dispatch({
      type: settingReducerCase.changeSettings,
      payload: settings,
    })
  }, [settings])

  useEffect(() => {
    const settings = selector
    setSettings(settings)
  }, [])

  const renderSettingItem = ({ item }: { item: SettingOption }) => {
    switch (item.type) {
      case 'select':
        return (
          <Box style={{ marginTop: 10 }}>
            <Text>{item.label}</Text>
            <Select
              selectedValue={settings[item.key as keyof Settings] as string}
              minWidth="200"
              accessibilityLabel={`Lựa chọn ${item.label.toLowerCase()}`}
              placeholder={`Lựa chọn ${item.label.toLowerCase()}`}
              _selectedItem={{
                bg: 'teal.300',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(value) =>
                setSettings({
                  ...settings,
                  [item.key as keyof Settings]: value,
                })
              }
            >
              {item.options?.map((option) => (
                <Select.Item key={option} label={option} value={option} />
              ))}
            </Select>
          </Box>
        )
      case 'switch':
        return (
          <Box style={styles.switchContainer}>
            <Box>
              <Text style={{ marginVertical: 'auto' }}>{item.label}</Text>
            </Box>
            <Text style={{ flexGrow: 1 }}></Text>
            <Switch
              style={{ marginTop: 10 }}
              isChecked={settings[item.key as keyof Settings] as boolean}
              onToggle={() =>
                setSettings({
                  ...settings,
                  [item.key as keyof Settings]:
                    !settings[item.key as keyof Settings],
                })
              }
            />
          </Box>
        )
      case 'text':
        return (
          <Box>
            <Text>{item.label}</Text>
          </Box>
        )
      default:
        return null
    }
  }

  return (
    <Box
      p={5}
      style={{
        paddingTop: getStatusBarHeight() + 16,
      }}
    >
      <FlatList
        data={settingOptions}
        renderItem={renderSettingItem}
        keyExtractor={(item) => item.key}
        ListHeaderComponent={() => (
          <VStack space={5}>
            <Heading size="md">Cài đặt</Heading>
            <Divider />
            <Box />
          </VStack>
        )}
      />
      <Button
        style={{ marginTop: 20 }}
        onPress={async () => {
          const currentTime =
            new Date().getHours() + ':' + new Date().getMinutes()
          await schedulePushNotification({
            title: `Thời Tiết Hiện Tại - ${currentTime}`,
            body:
              `Nhiệt độ ${currentWeather?.current.temp_c}°C 🌡️, ` +
              `Độ ẩm ${currentWeather?.current.humidity}% 💧,` +
              '\n' +
              (forecastWeather?.forecast.forecastday[0].day
                .daily_chance_of_rain != 0
                ? 'Tỉ lệ mưa ' +
                  forecastWeather?.forecast.forecastday[0].day
                    .daily_chance_of_rain +
                  '% 🌧️,'
                : '') +
              `Tốc độ gió ${currentWeather?.current.wind_kph} km/h 🌬️ `,
          })
        }}
      >
        Test Hourly Notification
      </Button>
    </Box>
  )
}

export default SettingScreen
