import MainLayout from '@layouts/MainLayout'
import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function App() {
  return (
    <NativeBaseProvider>
      <MainLayout />
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
