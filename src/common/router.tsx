import HomeScreen from '@features/HomeScreen'
import SecondScreen from '@features/SecondScreen/SecondScreen'
import { NavigationContainer, NavigationProp } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

export type ScreenNames = ['HomeScreen', 'SecondScreen'] // type these manually
export type RootStackParamList = Record<ScreenNames[number], undefined>
export type StackNavigation = NavigationProp<RootStackParamList>

const Stack = createNativeStackNavigator<RootStackParamList>()
export const RouteStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={
          {
            //headerShown: false
          }
        }
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SecondScreen" component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
