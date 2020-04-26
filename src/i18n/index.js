import lang_enUS from './en-us'
import lang_pl from './pl'
import lang_zhHans from './zh-hans'

const langList = {
  'en-us': lang_enUS,
  // eslint-disable-next-line quote-props
  'pl': lang_pl,
  'zh-hans': lang_zhHans
}

// use this const as initial language setting in demo/testing purposes (should be dynamic BTW, currently it comes from quasar.conf.js):
export const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE || 'en-us'
const defaultLang = langList[DEFAULT_LOCALE]

export const getLang = (language) => {
  return langList[language] || defaultLang
}

export default langList
