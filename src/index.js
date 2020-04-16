import Lang from 'src/lang'
import QuasarTiptap from 'src/components/QuasarTiptap'

export const $o = {
  config: {}
}

const QuasarTiptapPlugin = {
  installed: false,
  spellcheck: true,

  install (Vue, options = {}) {
    $o.config = Object.freeze(options)
    console.log('install plugin', $o)

    this.spellcheck = options.spellcheck == null
      ? true
      : options.spellcheck

    // required plugins
    Lang.install($o, options.language)

    // quasar-tiptap
    Vue.component('quasar-tiptap', QuasarTiptap)
    Vue.prototype.$quasarTiptapPlugin = this
    Vue.prototype.$o = $o

    this.installed = true
  },
}

export * from 'src/extentions/index'
export * from 'src/components/index'

export {
  QuasarTiptapPlugin,
  QuasarTiptap,
}
