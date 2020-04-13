<template>
  <section class="tiptap tiptap-editor quasar-tiptap">
    <o-editor-menu-bar :editor="editor" :toolbar="toolbar" />

    <q-scroll-area ref="editorScroll" class="editor-scroll-area" :class="`view-${pageView}`" v-if="scrollable">
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
  TodoItem,
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
  Image
} from 'tiptap-extensions'

import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'

import {
  OTitle,
  ODoc,
  OParagraph,
  OBlockquote,
  OAlignment,
  OIndent,
  OBackColor,
  OForeColor,
  OHeading,
  OIframe,
  ODiagram,
  OKatexBlock,
  OKatexInline
} from 'src/lib/extentions'

import OEditorMenuBar from './menubars/OEditorMenuBar'

export default {
  name: 'quasar-tiptap',
  data () {
    return {
      pageView: 'page',
      menu: {
        add: false
      },

      // editor
      editor: null,
      json: {},
      html: '',

      // actions
      isSlideShow: false
    }
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    toolbar: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {
    EditorContent,
    OEditorMenuBar,
  },
  methods: {
    initEditor () {
      const extensions = [
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

        // tiptop
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
        new Code(),
        new CodeBlock(),
        new CodeBlockHighlight({
          languages: {
            java,
            javascript,
            css
          }
        }),
        new BulletList(),
        new ListItem(),
        new OrderedList(),
        new TodoItem({
          nested: true
        }),
        new TodoList(),
        new HorizontalRule(),
        new Table({
          resizable: true
        }),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new Placeholder({
          showOnlyCurrent: false,
          emptyNodeText: node => {
            if (node.type.name === 'title') {
              return 'Title'
            }
            return 'Content'
          }
        }),
        new Link(),
        new Image(),

        // quasar-tiptop
        new OTitle(),
        new ODoc(),
        new OParagraph(),
        new OBlockquote(),
        new OHeading({ levels: [1, 2, 3, 4, 5] }),
        new OAlignment(),
        new OIndent(),
        new OForeColor(),
        new OBackColor(),
        new OIframe(),
        new ODiagram(),
        new OKatexBlock(),
        new OKatexInline()
      ]

      this.editor = new Editor({
        extensions: extensions,
        autoFocus: true,
        content: '',
        onUpdate: ({ state, getJSON, getHTML }) => {
          this.json = getJSON()
          this.html = getHTML()
          console.log('json', this.html)
        }
      })
    },
    // content
    setContent () {
      // From JSON
      if (this.json.type) {
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
    showSidePanel () {},
    onSlideShow () {}
  },
  mounted: function () {
    this.html = this.content
    this.initEditor()
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
