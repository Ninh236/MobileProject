import { ReducerArgs } from '@common/types/reducer.type'
import { Region } from 'react-native-maps'

export const mapReducerCase = {
  region: 'map/setRegion',
}

export interface MapSettings {
  region: Region
}

const initialState: MapSettings = {
  region: {
    latitude: 21,
    longitude: 105,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  },
}

export default function mapReducer(
  state = initialState,
  { type, payload }: ReducerArgs
): MapSettings {
  switch (type) {
    case mapReducerCase.region:
      let s = {
        ...state,
        region: payload,
      }
      return Object.create(s)
    default:
      return state
  }
}
