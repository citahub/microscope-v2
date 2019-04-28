import { createAction } from 'redux-actions'
import * as constants from '../actionTypes'
import { Modal } from '../states/appState'

export type AppAction = {
  type: string,
  data: any,
  payload?: any
}

export function switchLanguage(language: string) {
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

export function showLoading(maskTop: number = 80) {
  return {
    type: constants.SHOW_LOADING,
    data: {
      maskTop: maskTop
    }
  }
}

export function hideLoading() {
  return {
    type: constants.HIDE_LOADING
  }
}

export function showModal(modal: Modal) {
  return {
    type: constants.SHOW_MODAL,
    data: modal
  }
}
export function hideModal() {
  return {
    type: constants.HIDE_MODAL
  }
}
export function tickTime() {
  return {
    type: constants.GLOBAL_TICKTIME,
    data: new Date().getTime()
  }
}
