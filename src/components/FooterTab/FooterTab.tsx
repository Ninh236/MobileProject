import { Center, HStack, Icon, IIconProps, Pressable, Text } from 'native-base'
import { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { StackNavigation } from '@common/router'
import React from 'react'

type Tab = {
  name: string
  label: string
  icon: any
  activeIcon: any
}

export default function FooterTab() {
  const tabs: Tab[] = [
    { name: 'MapScreen', label: 'Map', icon: 'map-outline', activeIcon: 'map' },
    {
      name: 'HomeScreen',
      label: 'Home',
      icon: 'map-marker-outline',
      activeIcon: 'map-marker',
    },
    {
      name: 'SettingScreen',
      label: 'Settings',
      icon: 'cog-outline',
      activeIcon: 'cog',
    },
  ]

  const [selectedTab, setSelectedTab] = useState('HomeScreen')

  const { navigate } = useNavigation<StackNavigation>()

  const handleNavigate = (
    screen: 'MapScreen' | 'HomeScreen' | 'SettingScreen'
  ) => {
    navigate(screen)
  }
  return (
    <HStack style={styles.footerTab} p={2} justifyContent="space-around">
      {tabs.map((tab) => (
        <Pressable
          key={tab.name}
          onPress={() => {
            setSelectedTab(tab.name)
            handleNavigate(
              tab.name as 'MapScreen' | 'HomeScreen' | 'SettingScreen'
            )
          }}
        >
          <Center>
            <Icon
              color="white"
              as={
                <MaterialCommunityIcons
                  name={selectedTab === tab.name ? tab.activeIcon : tab.icon}
                />
              }
              size="xl"
            />
          </Center>
        </Pressable>
      ))}
    </HStack>
  )
}
