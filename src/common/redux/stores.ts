import { configureStore, Reducer, UnknownAction } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { rootReducers } from './rootReducers'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
}

const pReducer = persistReducer(
  persistConfig,
  rootReducers as Reducer<any, any>
)

export const stores = configureStore({
  reducer: pReducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
})

export const persistor = persistStore(stores)

export type RootState = ReturnType<typeof rootReducers>
