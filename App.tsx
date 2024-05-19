import { persistor, stores } from '@common/redux/stores'
import MainLayout from '@layouts/MainLayout'
import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={stores}>
        <PersistGate loading={<></>} persistor={persistor}>
          <MainLayout />
        </PersistGate>
      </Provider>
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
