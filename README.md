# Quasar Tiptap (quasar-tiptap)

A modern WYSIWYG rich-text editor built on top of tiptap and Quasar for Vue.js

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
