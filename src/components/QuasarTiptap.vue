<template>
  <section class="tiptap tiptap-editor quasar-tiptap">
    <!-- Main Toolbar -->
    <o-editor-menu-bar :editor="editor" :toolbar="editorMenuBar" v-if="editable && showToolbar">
      <template slot="left">
        <slot name="toolbar-left" />
      </template>
      <template slot="right">
        <slot name="toolbar-right" />
      </template>
    </o-editor-menu-bar>

    <!-- Main Bubble -->
    <o-editor-menu-bubble :editor="editor" :toolbar="editorMenuBubble" :selected-cell-size="selectedCellSize" v-if="editable && showBubble" />

    <q-scroll-area ref="editorScroll" class="editor-scroll-area" :class="`view-${pageView}`" v-if="scrollable">
      <q-scroll-observer @scroll="onScroll" />
      <editor-content class="editor__content o--note-preview note-step-side-editor" :editor="editor" />
    </q-scroll-area>
    <div v-else>
      <editor-content class="editor__content o--note-preview note-step-side-editor" :editor="editor" />
    </div>
  </section>
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import {
  BulletList,
  CodeBlock,
  CodeBlockHighlight,
  HardBreak,
  ListItem,
  OrderedList,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Placeholder,
  Focus,
  HorizontalRule,
  TrailingNode,
  // Image
} from 'tiptap-extensions'

import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
require('src/statics/iconfont/iconfont')

import {
  OTitle,
  ODoc,
  OParagraph,
  OBlockquote,
  OTodoItem,
  OAlign,
  OAlignment,
  OIndent,
  OLineHeight,
  OBackColor,
  OForeColor,
  OFontFamily,
  OHeading,
  OIframe,
  ODiagram,
  OKatexBlock,
  OKatexInline,
  OFormatClear,
  OPrint,
  OImage,
  OEmbed,
  RecommendedExtensions
} from 'src/extentions'

import DynamicClass from 'src/extentions/dynamic'

import OEditorMenuBar from 'src/components/menubars/OEditorMenuBar'
import OEditorMenuBubble from 'src/components/menubars/OEditorMenuBubble'

import { DefaultToolbar, DefaultBubble } from 'src/data/editor'

export default {
  name: 'quasar-tiptap',
  data () {
    return {
      // editor
      editor: null,
      json: {},
      html: '',
      selectedCellSize: 0
    }
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    editable: {
      type: Boolean,
      default: true
    },
    showToolbar: {
      type: Boolean,
      default: true
    },
    showBubble: {
      type: Boolean,
      default: true
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    editorProps: {
      type: Object,
      default: function () {
        return {
        }
      }
    },
    extensions: {
      type: Array,
      default: function () {
        return []
      }
    },
    toolbar: {
      type: Array,
      default: function () {
        return []
      }
    },
    bubble: {
      type: Array,
      default: function () {
        return []
      }
    },
    pageView: {
      type: String,
      default: 'page'
    },
    options: {
      type: Object,
      default: function () {
        return {
        }
      }
    }
  },
  components: {
    EditorContent,
    OEditorMenuBar,
    OEditorMenuBubble,
  },
  computed: {
    editorMenuBar () {
      return this.toolbar.length > 0 ? this.toolbar : DefaultToolbar
    },
    editorMenuBubble () {
      return this.bubble.length > 0 ? this.bubble : DefaultBubble
    }
  },
  methods: {
    initEditor () {
      const customExtensions = this.generateExtensions()
      const extensions = [
        // custom
        ...customExtensions,

        // required
        new HardBreak(),
        new History(),
        new Focus({
          className: 'has-focus',
          nested: true
        }),
        new TrailingNode({
          node: 'paragraph',
          notAfter: ['paragraph']
        }),
        new OAlign()
      ]

      this.editor = new Editor({
        editorProps: this.editorProps,
        extensions: extensions,
        autoFocus: true,
        editable: this.editable,
        content: '',
        onInit: ({ state, view }) => {
          this.$emit('init', { state, view })
        },
        onFocus: ({ event, state, view }) => {
          this.$emit('focus', { event, state, view })
        },
        onBlur: ({ event, state, view }) => {
          this.$emit('blur', { event, state, view })
        },
        onUpdate: ({ getJSON, getHTML, state, transaction }) => {
          this.$emit('update', { getJSON, getHTML, state, transaction })
        },
        onTransaction: ({ getJSON, getHTML, state, transaction }) => {
          const selectedCellElements = document.querySelectorAll('.selectedCell')
          this.selectedCellSize = selectedCellElements.length

          this.$emit('transaction', { getJSON, getHTML, state, transaction })
        }
      })
    },
    generateExtensions () {
      let extensions = []
      for (let extension of this.extensions) {
        if (typeof extension === 'string') {
          if (!RecommendedExtensions.includes(extension)) {
            continue
          }

          switch (extension) {
            // tiptop
            case 'CodeBlockHighlight':
              extension = new CodeBlockHighlight({
                languages: { java, javascript, css }
              })
              break
            case 'Table':
              extension = new Table({
                resizable: true
              })
              extensions.push(extension)
              extensions.push(new TableHeader())
              extensions.push(new TableCell())
              extensions.push(new TableRow())
              continue

            // quasar-tiptop
            case 'OTodoItem':
              extension = new OTodoItem({ nested: true })
              break
            case 'OHeading':
              extension = new OHeading({ levels: [1, 2, 3, 4, 5] })
              break
            default:
              try {
                extension = new DynamicClass(extension)
              } catch (e) {
                console.error(e.message)
              }
              break
          }
        }
        extensions.push(extension)
      }
      return extensions
    },
    // content
    setContent () {
      try {
        this.json = JSON.parse(this.content)
        this.html = ''
      } catch (e) {
        this.html = this.content
        this.json = {}
      }

      // From JSON
      if (this.json && this.json.type) {
        this.editor.setContent(this.json, true)
      }
      if (this.html) {
        this.editor.setContent(this.html, true)
      }

      // Focus
      this.editor.focus()
    },
    cleanContent () {
      this.editor.clearContent(false)
      this.editor.focus()
    },
    onScroll (scroll) {
      this.$emit('scroll', scroll)
    },
    showSidePanel () {},
    onSlideShow () {}
  },
  watch: {
    editable (to, from) {
      console.log('editable', to)
      this.editor.options.editable = to
    },
    content (to, from) {
      this.setContent()
    }
  },
  mounted: function () {
    this.initEditor()

    // set content
    this.setContent()
  },
  deactivated () {
  },
  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>

<style lang="stylus">
  @import "../css/tiptap.styl";
</style>
