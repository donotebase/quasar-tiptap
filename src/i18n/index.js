import enUS from './en-us'
import zhHans from './zh-hans'

const defaultLang = enUS
const langList = {
  'en-us': enUS,
  'zh-hans': zhHans
}

export const getLang = (language) => {
  return langList[language] || defaultLang
}

export default langList
