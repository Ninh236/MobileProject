import HomeScreen from '@features/HomeScreen'
import MapScreen from '@features/MapScreen'
import SettingScreen from '@features/SettingScreen'
import { NavigationProp } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

export type ScreenNames = ['HomeScreen', 'MapScreen', 'SettingScreen'] // type these manually
export type RootStackParamList = Record<ScreenNames[number], undefined>
export type StackNavigation = NavigationProp<RootStackParamList>

const Stack = createNativeStackNavigator<RootStackParamList>()
export const RouteStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
    </Stack.Navigator>
  )
}
