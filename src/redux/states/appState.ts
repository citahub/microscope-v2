export interface ToastMessage {
  text: string | null
  timeout: number
  id: number | null
}

export interface Modal {
  ui: any
  uiProps?: any
}
export interface Loading {
  maskTop: number
}
export interface AppState {
  toast: ToastMessage | null
  loading: Loading | null
  modal: Modal | null

  drawerOpen: boolean
  appWidth: number
  appHeight: number
  appLanguage: string

  // global
  globalTickTime: number | null
}
