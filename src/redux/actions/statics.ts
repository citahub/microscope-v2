import * as constants from '../actionTypes'

import * as dataAPI from '../../utils/dataAPI'

export type StaticsAction = {
  type: string
  data: any
}

export function staticsProposals() {
  return (dispatch: any) => {
    return dataAPI
      .statics('proposals')
      .then((data: any) => {
        dispatch({
          type: constants.GET_STATICS_PROPOSALS,
          data: data
        })
        return true
      })
      .catch((error: any) => {
        dispatch({
          type: constants.OPERATION_FAIL,
          error: error
        })
        return false
      })
  }
}
