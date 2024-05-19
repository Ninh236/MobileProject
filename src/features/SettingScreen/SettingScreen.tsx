import React, { useState } from 'react'
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
} from 'native-base'

interface SettingOption {
  key: string
  label: string
  type: 'select' | 'switch' | 'text'
  options?: string[]
}

interface Settings {
  temperatureUnit: string
  windSpeedUnit: string
  pressureUnit: string
  timeFormat: string
  notificationCurrentConditions: boolean
  warningNotifications: boolean
  hurricaneNotifications: boolean
  lightningNotifications: boolean
  weatherUpdateRate: string
}

const settingOptions: SettingOption[] = [
  {
    key: 'temperatureUnit',
    label: 'Temperature unit',
    type: 'select',
    options: ['Celsius', 'Fahrenheit'],
  },
  {
    key: 'windSpeedUnit',
    label: 'Wind speed unit',
    type: 'select',
    options: ['km/h', 'mph'],
  },
  {
    key: 'pressureUnit',
    label: 'Pressure unit',
    type: 'select',
    options: ['hPa', 'mmHg'],
  },
  {
    key: 'timeFormat',
    label: 'Time format',
    type: 'select',
    options: ['24h', '12h'],
  },
  {
    key: 'notificationCurrentConditions',
    label: 'Notification - Current conditions',
    type: 'switch',
  },
  {
    key: 'warningNotifications',
    label: 'Warning notifications',
    type: 'switch',
  },
  {
    key: 'hurricaneNotifications',
    label: 'Hurricane notifications',
    type: 'switch',
  },
  {
    key: 'lightningNotifications',
    label: 'Lightning notifications',
    type: 'switch',
  },
  {
    key: 'weatherUpdateRate',
    label: 'Weather update rate',
    type: 'select',
    options: ['15min', '30min', '1h'],
  },
  { key: 'about', label: 'Version: 1.0.0', type: 'text' },
]

const SettingScreen: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
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

  const renderSettingItem = ({ item }: { item: SettingOption }) => {
    switch (item.type) {
      case 'select':
        return (
          <Box>
            <Text>{item.label}</Text>
            <Select
              selectedValue={settings[item.key as keyof Settings]}
              minWidth="200"
              accessibilityLabel={`Choose ${item.label}`}
              placeholder={`Choose ${item.label}`}
              _selectedItem={{
                bg: 'teal.600',
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
          <Box>
            <Text>{item.label}</Text>
            <Switch
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
    <Box p={5}>
      <FlatList
        data={settingOptions}
        renderItem={renderSettingItem}
        keyExtractor={(item) => item.key}
        ListHeaderComponent={() => (
          <VStack space={5}>
            <Heading size="md">Settings</Heading>
            <Divider />
          </VStack>
        )}
      />
    </Box>
  )
}

export default SettingScreen
