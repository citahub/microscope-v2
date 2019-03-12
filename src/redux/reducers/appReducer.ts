import * as constants from '../actionTypes'
import { AppAction } from '../actions/appAction'
import { AppState } from '../states/appState'

const initialState: AppState = {
  toast: {
    text: null,
    timeout: 2000,
    id: null
  },
  showLoading: false,
  maskTopPoz: null,
  maskColor: null,
  modal: {
    ui: null,
    uiProps: null
  },

  drawerOpen: false,
  appWidth: 1024,
  appHeight: 800,
  appLanguage: navigator.language || 'en',

  globalTickTime: new Date().getTime()
}

export default function(state: AppState = initialState, action: AppAction) {
  switch (action.type) {
    case constants.TOAST:
      return {
        ...state,
        toast: {
          ...action.payload
        }
      }
    case constants.SHOW_LOADING:
      return {
        ...state,
        showLoading: true,
        maskTopPoz: action.maskTopPoz,
        maskColor: action.maskColor
      }
    case constants.HIDE_LOADING:
      return {
        ...state,
        showLoading: false,
        maskTopPoz: null,
        maskColor: null
      }
    case constants.SHOW_MODAL:
      return {
        ...state,
        modal: {
          ui: action.data.ui,
          uiProps: action.data.uiProps
        }
      }
    case constants.HIDE_MODAL:
      return {
        ...state,
        modal: {
          ui: null,
          uiProps: null
        }
      }

    case constants.RESIZE_APP:
      return {
        ...state,
        appWidth: action.data.appWidth,
        appHeight: action.data.appHeight
      }
    case constants.SWITCH_LANGUAGE:
      return {
        ...state,
        appLanguage: action.data
      }

    case constants.GLOBAL_TICKTIME:
      return {
        ...state,
        globalTickTime: action.data
      }
    default:
      return state
  }
}
