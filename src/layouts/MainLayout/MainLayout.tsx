import { RouteStack } from '@common/router'
import FooterTab from '@components/FooterTab'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

export default function MainLayout() {
  return (
    <NavigationContainer>
      <RouteStack />
      <FooterTab />
    </NavigationContainer>
  )
}
