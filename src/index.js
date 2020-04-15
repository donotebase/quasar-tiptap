import QuasarTiptap from './components/QuasarTiptap'

const QuasarTiptapPlugin = {
  installed: false,
  spellcheck: true,

  install (Vue, options = {}) {
    this.spellcheck = options.spellcheck == null
      ? true
      : options.spellcheck

    Vue.component('quasar-tiptap', QuasarTiptap)
    Vue.prototype.$quasarTiptapPlugin = this

    this.installed = true
  },
}

export * from './extentions/index'

export {
  QuasarTiptapPlugin,
  QuasarTiptap,
}
