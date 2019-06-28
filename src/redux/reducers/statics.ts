import * as constants from '../actionTypes'
import { StaticsAction } from '../actions/statics'
import { StaticsState } from '../states/statics'

const initialState: StaticsState = {
  proposals: null
}

export default function(
  state: StaticsState = initialState,
  action: StaticsAction
) {
  switch (action.type) {
    case constants.GET_STATICS_PROPOSALS:
      return {
        ...state,
        proposals: action.data
      }
    default:
      return state
  }
}
