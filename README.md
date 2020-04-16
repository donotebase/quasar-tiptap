# Quasar Tiptap (quasar-tiptap)

A modern WYSIWYG rich-text editor built on top of [tiptap](https://github.com/scrumpy/tiptap) and [Quasar Framework](https://github.com/quasarframework) for [Vue.js](https://github.com/vuejs/vue)

## Installation
```bash
yarn add quasar-tiptap
```

or
```bash
npm install --save quasar-tiptap
```

## Usage

```vue
<template>
  <div>
    <quasar-tiptap><quasar-tiptap>
  </div>
</template>

<script>
import { QuasarTiptap } from 'quasar-tiptap'
import 'quasar-tiptap/lib/index.css'

export default {
  components: {
    'quasar-tiptap': QuasarTiptap,
  },
}
</script>
```

## Development

### Build
```bash
yarn run build
```

## Thanks

- Authors of [Quasar Framework](https://github.com/quasarframework)
- Authors of [tiptap](https://github.com/scrumpy/tiptap)
- Leecason for [element-tiptap](https://github.com/Leecason/element-tiptap)

## License

The MIT License (MIT). Please see [License File](https://github.com/donotebase/quasar-tiptap/blob/master/LICENSE.md) for more information.
