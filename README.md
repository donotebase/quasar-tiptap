# quasar-tiptap

A modern WYSIWYG rich-text editor built on top of [tiptap](https://github.com/scrumpy/tiptap) and [Quasar Framework](https://github.com/quasarframework) for Vue.js.

[![](https://img.shields.io/npm/v/quasar-tiptap.svg?label=version)](https://www.npmjs.com/package/quasar-tiptap)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fe954819c420439485737e74aff30485)](https://www.codacy.com/gh/donotebase/quasar-tiptap?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=donotebase/quasar-tiptap&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/donotebase/quasar-tiptap.svg?branch=dev)](https://travis-ci.org/donotebase/quasar-tiptap)
[![](https://img.shields.io/npm/dependency-version/quasar-tiptap/peer/vue?color=vue)](https://www.npmjs.com/package/quasar-tiptap)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Join the chat at discord](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/QAzbWuq)
[![](https://img.shields.io/npm/l/quasar-tiptap.svg)](https://www.npmjs.com/package/quasar-tiptap)

## Examples & Demos

- [Examples](https://github.com/donotebase/quasar-tiptap/tree/dev/src/pages/examples)
- [Live Demo](https://donotebase.github.io/quasar-tiptap)
- [Code Sandbox](https://codesandbox.io/s/quasar-tiptap-fytkc?file=/src/pages/Index.vue)

## Features

- Extensions: tiptap official extensions, and dozens of great extensions
- Markdown
- Diagram and LaTex Math formula
- I18n support (`en-us`, `pl`, `zh-hans`)
- Fully extensible for editor extensions, menubar

### I18n
- `en-us` default
- `zh-hans`
- `pl` by @qyloxe

## Installation

### Dependencies

quasar-tiptap is built on top of Quasar Framework and tiptap, therefore it should be used in Quasar App and depends on several packages.

```bash
# required
yarn add tiptap
yarn add tiptap-extensions

# optional (required if diagram and latex formula enabled)
yarn add vue-codemirror
yarn add mermaid
yarn add katex
```

### quasar-tiptap
```bash
yarn add quasar-tiptap
```

### quasar.conf.js

Use `mdi-v5` icon set and `v-close-popup` directive.
```bash
extras: [
  'mdi-v5'
],
framework: [
  directives: [
    'ClosePopup'
  ]
]
```

## Usage

Register `quasar-tiptap` globally by installing plugin, or import `QuasarTiptap` component as needed.

### Install plugin

```vue
import Vue from 'vue'
import { QuasarTiptapPlugin, RecommendedExtensions } from 'quasar-tiptap'

Vue.use(QuasarTiptapPlugin, {
  language: 'zh-hans',
  spellcheck: true
})
```

### Import component
```vue
<template>
  <div>
    <quasar-tiptap v-bind="options" @update="onUpdate" />
  </div>
</template>

<script>
import { QuasarTiptap, RecommendedExtensions } from 'quasar-tiptap'
import 'quasar-tiptap/lib/index.css'

export default {
  data () {
    return {
      options: {
        content: 'content',
        editable: true,
        extensions: [
          ...RecommendedExtensions,
          // other extenstions
          // name string, or custom extension
        ],
        toolbar: [
          'add-more',
          'separator',
          'bold',
          'italic',
          'underline',
          // other toolbar buttons
          // name string
        ]
      },
      json: '',
      html: ''
    }
  },
  components: {
    QuasarTiptap,
  },
  methods: {
    onUpdate ({ getJSON, getHTML }) {
      this.json = getJSON()
      this.html = getHTML()
      console.log('html', this.html)
    }
  },
  mounted () {
    // set language dynamically
    this.$o.lang.set('en-us')
  }
}
</script>
```

### Editor Properties

| **Property** | **Type** | **Default** | **Description** |
| --- | :---: | :---: | --- |
| `content` | `Object\|String` | `null` | The editor content |
| `editable` | `Boolean` | `true` | When set to `false` the editor is read-only. |
| `extensions` | `Array` | `[]` | A list of extensions used, by the editor. This can be `String`, `Nodes`, `Marks` or `Plugins`. |
| `toolbar` | `Array` | `[]` | A list of toolbar button used, by the editor. This can be `String`, Vue components |

## Extensions

### Available Extensions
Extensions provided by tiptap official and quasar-tip:

```js
export const TipTapExtensions = [
  'Bold',
  'Italic',
  'Strike',
  'Underline',
  'Code',
  'CodeBlock',
  'CodeBlockHighlight',
  'BulletList',
  'OrderedList',
  'ListItem',
  'TodoList',
  'HorizontalRule',
  'Table',
  'Link',
  'Image',
]

export const QuasarTipTapExtensions = [
  'OTitle',
  'ODoc',
  'OParagraph',
  'OBlockquote',
  'OTodoItem',
  'OHeading',
  'OAlignment',
  'OLineHeight',
  'OForeColor',
  'OBackColor',
  'OFontFamily',
  'OIframe',
  'ODiagram',
  'OKatexBlock',
  'OKatexInline',
  'OFormatClear',
]

export const RecommendedExtensions = [
  ...TipTapExtensions,
  ...QuasarTipTapExtensions
]
```

#### extensions and toolbar in options

|extension   |toolbar  |Remarks  |
|:------|:------------|:--------|
|'Bold' |'bold' | |
|'Italic' |'italic' | |
|'Strike' |'strike' | |
|'Underline' |'underline' | |
|'Code' |'code' | |
|'CodeBlock' |'code_blok' | |
|'CodeBlockHighlight' | | |
|'BulletList' |'bullet_list' | |
|'OrderedList' |'ordered_list' | |
|'ListItem' | | |
|'TodoList' |'todo_list' | |
|'HorizontalRule' |'horizontal' | |
|'Table' |'table' | |
|'Link' | | |
|'Image' |'photo' | |
|'OTitle' | | |
|'ODoc' | | |
|'OParagraph' | | |
|'OBlockquote' |'blockquote' | |
|'OTodoItem' | | |
|'OHeading' |'heading' | |
|'OIndent' |'indent', 'outdent' | |
|'OAlignment' |'align-dropdown', 'align-group' | |
|'OLineHeight' |'line-height' | |
|'OForeColor' |'fore-color' | |
|'OBackColor' |'back-color' | |
|'OFontFamily' |'font-family' | |
|'OIframe' | |'add-more' |
|'ODiagram' | |'add-more' |
|'OKatexBlock' | |'add-more' |
|'OKatexInline' | |'add-more' |
|'OFormatClear' |'format_clear' | |

## 🏗 Contributing ![PR or ISSUE](https://img.shields.io/badge/PR%20or%20ISSUE-welcome-brightgreen)

1. 🍴Fork it
2. 🔀Create your branch: `git checkout -b your-branch`
3. 🎨Make your changes
4. 📝Commit your changes with [Semantic Commit Messages (recommended)](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
5. 🚀Push to the branch: `git push origin your-branch`
6. 🎉Submit a PR to `dev` branch

## Roadmap

A todo list will be shown in [QuasarTiptap Project](https://github.com/donotebase/quasar-tiptap/projects/1) kanban.

## Thanks

- Authors of [Quasar Framework](https://github.com/quasarframework)
- Authors of [tiptap](https://github.com/scrumpy/tiptap)
- Leecason for [element-tiptap](https://github.com/Leecason/element-tiptap)

## License

The MIT License (MIT). Please see [License File](https://github.com/donotebase/quasar-tiptap/blob/master/LICENSE) for more information.
