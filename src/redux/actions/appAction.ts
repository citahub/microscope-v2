import { createAction } from 'redux-actions'
import * as constants from '../actionTypes'
import { Modal, ToastMessage } from '../states/appState'

interface SWITCH_LANGUAGE {
  type: constants.SWITCH_LANGUAGE
  data: object | string
}
interface RESIZE_APP {
  type: constants.RESIZE_APP
  data: {
    appWidth: number
    appHeight: number
  }
}
interface TOAST {
  type: constants.TOAST
  payload: ToastMessage
}
interface SHOW_LOADING {
  type: constants.SHOW_LOADING
  data: object
}
interface HIDE_LOADING {
  type: constants.HIDE_LOADING
}
interface SHOW_MODAL {
  type: constants.SHOW_MODAL
  data: Modal
}
interface HIDE_MODAL {
  type: constants.HIDE_MODAL
}

interface GLOBAL_TICKTIME {
  type: constants.GLOBAL_TICKTIME
  data: number | null
}

export type AppAction =
  | SWITCH_LANGUAGE
  | RESIZE_APP
  | TOAST
  | SHOW_MODAL
  | HIDE_MODAL
  | SHOW_LOADING
  | HIDE_LOADING
  | GLOBAL_TICKTIME

export function switchLanguage(language: string): SWITCH_LANGUAGE {
  return {
    type: constants.SWITCH_LANGUAGE,
    data: language
  }
}

export function resize(appWidth: number, appHeight: number) {
  return {
    type: constants.RESIZE_APP,
    data: {
      appWidth: appWidth,
      appHeight: appHeight
    }
  }
}

export const toast = createAction(
  constants.TOAST,
  (text: string, timeout: number = 2000) => {
    if (!text) text = 'unknown exception！'
    return {
      text,
      timeout,
      id: new Date().getTime()
    }
  }
)

export function showLoading(): SHOW_LOADING {
  return {
    type: constants.SHOW_LOADING,
    data: {}
  }
}

export function hideLoading(): HIDE_LOADING {
  return {
    type: constants.HIDE_LOADING
  }
}

export function showModal(modal: Modal): SHOW_MODAL {
  return {
    type: constants.SHOW_MODAL,
    data: modal
  }
}
export function hideModal(): HIDE_MODAL {
  return {
    type: constants.HIDE_MODAL
  }
}
export function tickTime(): GLOBAL_TICKTIME {
  return {
    type: constants.GLOBAL_TICKTIME,
    data: new Date().getTime()
  }
}
