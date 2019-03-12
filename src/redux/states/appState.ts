export interface ToastMessage {
  text: string | null
  timeout: number
  id: number | null
}

export interface Modal {
  ui: any
  uiProps: {
    maskTopPoz: number | null
    maskColor: string | null
    style: object | null
  } | null
}

export interface AppState {
  toast: ToastMessage
  showLoading: boolean
  maskTopPoz: number | null
  maskColor: string | null
  modal: Modal
  drawerOpen: boolean
  appWidth: number
  appHeight: number
  appLanguage: string

  // global
  globalTickTime: number | null
}
