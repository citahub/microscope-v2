import { createAction } from 'redux-actions'
import * as constants from '../actionTypes'

export interface SWITCH_LANGUAGE {
    type: constants.SWITCH_LANGUAGE;
    data: object | string;
}
export interface RESIZE_APP {
    type: constants.RESIZE_APP;
    data: object;
}
export interface TOAST {
    type: constants.TOAST;
    data: object;
}
export interface SHOW_LOADING {
    type: constants.SHOW_LOADING;
    maskTopPoz: number;
    maskColor: string;
}
export interface HIDE_LOADING{
  type: constants.HIDE_LOADING;

}
export interface SHOW_MODAL{
  type: constants.SHOW_MODAL;
  data: {

  };
}
export interface HIDE_MODAL{
  type: constants.HIDE_MODAL;
}
export type AppAction = SWITCH_LANGUAGE | RESIZE_APP | TOAST | SHOW_MODAL | HIDE_MODAL | SHOW_LOADING | HIDE_LOADING;

export function switchLanguage(language:string):SWITCH_LANGUAGE {
  return {
    type: constants.SWITCH_LANGUAGE,
    data: language
  }
}

export function resize(appWidth:number, appHeight:number) {
  return {
    type: constants.RESIZE_APP,
    data: {
      appWidth: appWidth,
      appHeight: appHeight
    }
  }
}

export const toast = createAction(constants.TOAST, (text:string, timeout:number = 2000) => {
  if (!text) text = 'unknown exception！'
  return {
    text,
    timeout,
    id: new Date().getTime()
  }
})

export function showLoading(maskTopPoz:number = null, maskColor:string = null):SHOW_LOADING {
  return {
    type: constants.SHOW_LOADING,
    maskTopPoz: maskTopPoz,
    maskColor: maskColor
  }
}

export function hideLoading():HIDE_LOADING {
  return {
    type: constants.HIDE_LOADING
  }
}

export function showModal(ui:any, uiProps:object):SHOW_MODAL {
  return {
    type: constants.SHOW_MODAL,
    data: {
      ui: ui,
      uiProps: uiProps
    }
  }
}
export function hideModal():HIDE_MODAL {
  return {
    type: constants.HIDE_MODAL
  }
}
