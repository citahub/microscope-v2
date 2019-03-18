import * as constants from '../actionTypes'

import * as dataAPI from '../../utils/dataAPI'

interface GET_STATICS_PROPOSALS {
  type: constants.GET_STATICS_PROPOSALS
  data: any
}
//
export type StaticsAction =
  | GET_STATICS_PROPOSALS
 
export function staticsProposals(){
  return (dispatch: any) => {
    return dataAPI
      .statics("proposals")
      .then((data: any) => {
        dispatch({
          type: constants.GET_STATICS_PROPOSALS,
          data: data
        })
      })
      .catch((error: any) => {
        dispatch({
          type: constants.OPERATION_FAIL,
          error: error
        })
      })
  }
}