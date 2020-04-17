import Vue from 'vue'

import install from 'src/install'
import QuasarTiptap from 'src/components/QuasarTiptap'

Vue.use({ install }, {})

const QuasarTiptapPlugin = {
  installed: false,
  spellcheck: true,

  install (Vue, opts = {}) {
    this.spellcheck = opts.spellcheck === null
      ? true
      : opts.spellcheck
    Vue.prototype.$o.lang.set(opts.language)

    // quasar-tiptap
    Vue.component('quasar-tiptap', QuasarTiptap)
    Vue.prototype.$quasarTiptapPlugin = this

    this.installed = true
  },
}

export * from 'src/extentions/index'
export * from 'src/components/index'

export {
  QuasarTiptapPlugin,
  QuasarTiptap,
}
