export interface ToastMessage{
  text: string | null;
  timeout: number;
  id: number | null;
}

export interface Modal{
  ui: any;
  uiProps: {
    maskTopPoz: number;
    maskColor: string;
    style: object;
  };
}

export interface AppState {
  toast: ToastMessage;
  showLoading: boolean;
  maskTopPoz: number|null;
  maskColor: string|null;
  modal: Modal;
  drawerOpen:boolean;
  appWidth: number;
  appHeight: number;
  appLanguage: string;

  // global
  globalTickTime: number | null;
}
