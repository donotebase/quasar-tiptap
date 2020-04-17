import Lang from 'src/lang'

export const $o = {
  config: {}
}

export default function (Vue, opts = {}) {
  const cfg = $o.config = Object.freeze(opts.config || {})

  // required plugins
  Lang.install($o, opts.language)

  Vue.prototype.$o = $o
}
