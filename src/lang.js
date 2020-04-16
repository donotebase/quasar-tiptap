import Vue from 'vue'
import { getLang } from 'src/i18n'

export default {
  install ($o, language) {
    this.set = (language) => {
      language = language || this.getLocale()

      let lang = getLang(language)
      lang.set = this.set
      lang.getLocale = this.getLocale

      Vue.util.defineReactive($o, 'lang', lang)
      this.isoName = lang.isoName
      this.nativeName = lang.nativeName
      this.props = lang
    }

    this.set(language)
  },
  getLocale () {
    let val =
      navigator.language ||
      navigator.languages[0] ||
      navigator.browserLanguage ||
      navigator.userLanguage ||
      navigator.systemLanguage

    console.log('lang', val)
    if (val) {
      return val.toLowerCase()
    }
  }
}
