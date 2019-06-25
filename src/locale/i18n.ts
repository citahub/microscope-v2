import { addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import zhLocaleData from 'react-intl/locale-data/zh'

addLocaleData(enLocaleData)
addLocaleData(zhLocaleData)

import zh_CN from './zh_CN'
import en_US from './en_US'

export function chooseLocale(language: string) {
  var obj = en_US
  if (language.toLowerCase().indexOf('zh') > -1) {
    obj = zh_CN
  } else if (language.toLowerCase().indexOf('en') > -1) {
    obj = en_US
  }
  return obj
}

export const languages = ['zh', 'en']

var defaultLanguage = 'zh'
if (window.navigator.language.indexOf('zh') === -1) {
  defaultLanguage = 'en'
}

export { defaultLanguage }
