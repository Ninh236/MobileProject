import { combineReducers } from 'redux'
import settingReducer from './reducers/setting.reducer'
import weatherReducer from './reducers/weather.reducer'

export const rootReducers = combineReducers({
  settingReducer,
  weatherReducer,
})
