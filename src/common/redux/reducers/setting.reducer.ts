import { ReducerArgs } from '@common/types/reducer.type'

export interface settingReducerState {
  settings: any
}

const initialState: settingReducerState = {
  settings: {},
}

export const settingReducerCase = {
  changeSettings: 'settingReducer/changeSettings',
}

export default function settingReducer(
  state = initialState,
  { type, payload }: ReducerArgs
): settingReducerState {
  switch (type) {
    case settingReducerCase.changeSettings:
      let s = {
        ...state,
        settings: payload,
      }
      return Object.create(s)
    default:
      return state
  }
}
