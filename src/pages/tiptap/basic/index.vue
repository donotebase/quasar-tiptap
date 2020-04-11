<template>
  <q-page class="page-tiptap-basic">
    <section class="tiptap tiptap-editor">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, getMarkAttrs, focused }">
        <section class="row col-12 justify-between items-center bg-light tiptap-menubar">
          <div class="row q-px-xs menubar is-hidden" :class="{ 'is-focused': focused }">
            <o-menubar-btn icon="add" :tooltip="$t('add')" class="note-step-add">
              <q-menu ref="addPopover" v-model="menu.add" anchor="bottom left" self="top left" content-class="o-menu">
                <section>
                  <o-common-item icon="mdi-code-braces" :label="$t('code_block')" @click.native="commands.code_block" v-close-popup />
                  <o-common-item icon="mdi-sigma" :label="$t('formula')" :side-label="$t('block')" @click.native="commands.katex_block" v-close-popup />
                  <o-common-item icon="mdi-sigma" :label="$t('formula')" :side-label="$t('inline')" @click.native="commands.katex_inline" v-close-popup />
                  <o-common-item icon="mdi-sitemap" :label="$t('diagram.text')" @click.native="commands.diagram" v-close-popup>
                    <q-tooltip anchor="center right" self="center left">
                      <div class="text-bold">Mermaid</div>
                      <div class="text-white">{{$t('diagram.text.tips')}}</div>
                    </q-tooltip>
                  </o-common-item>
                  <q-separator />
                  <o-common-item icon="mdi-iframe" :label="$t('iframe')">
                    <q-menu ref="iframePopover" anchor="top right" self="top left" class="shadow-5">
                      <meta-input :title="$t('iframe')" icon="link"
                                  @primaryAction="insertIframe(commands.iframe, $event)">
                      </meta-input>
                    </q-menu>
                  </o-common-item>
                </section>
              </q-menu>
            </o-menubar-btn>

            <q-separator vertical inset />
            <o-menubar-btn icon="mdi-format-bold" tooltip="Bold" :class="{ 'is-active': isActive.bold() }" @click.native="commands.bold" />
            <o-menubar-btn icon="format_italic" :class="{ 'is-active': isActive.italic() }" @click.native="commands.italic" />
            <o-menubar-btn icon="format_strikethrough" :class="{ 'is-active': isActive.strike() }" @click.native="commands.strike" />
            <o-menubar-btn icon="format_underline" :class="{ 'is-active': isActive.underline() }" @click.native="commands.underline" />
            <o-menubar-btn icon="code" :class="{ 'is-active': isActive.code() }" @click.native="commands.code" />

            <q-separator vertical inset />
            <o-fore-color-dropdown :commands="commands" :get-mark-attrs="getMarkAttrs" />
            <o-back-color-dropdown :commands="commands" />

            <q-separator vertical inset />
            <o-align-dropdown :commands="commands" />

            <q-separator vertical inset />
            <o-heading-dropdown :commands="commands" :is-active="isActive" />
            <o-heading-group :max="3" :commands="commands" :is-active="isActive" v-if="false" />

            <q-separator vertical inset />
            <o-menubar-btn icon="remove" @click.native="commands.horizontal_rule" />
            <o-menubar-btn icon="format_list_bulleted" :class="{ 'is-active': isActive.bullet_list() }" @click.native="commands.bullet_list" />
            <o-menubar-btn icon="format_list_numbered" :class="{ 'is-active': isActive.ordered_list() }" @click.native="commands.ordered_list" />

            <q-separator vertical inset />
            <o-menubar-btn icon="format_quote" :class="{ 'is-active': isActive.blockquote() }" @click.native="commands.blockquote" />
            <o-menubar-btn icon="mdi-code-braces" :class="{ 'is-active': isActive.code_block() }" @click.native="commands.code_block" />

            <q-separator vertical inset />
            <o-menubar-btn icon="mdi-table" @click.native="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })" />

            <q-separator vertical inset />
            <o-menubar-btn icon="mdi-overscan" :tooltip="$t('page.view.full')" :class="pageView==='full'?'is-active':''" @click.native="pageView='full'" />
            <o-menubar-btn icon="mdi-fit-to-page-outline" :tooltip="$t('page.view.page')" :class="pageView==='page'?'is-active':''" @click.native="pageView='page'" />

            <q-separator vertical inset />
            <o-menubar-btn icon="undo" @click.native="commands.undo" />
            <o-menubar-btn icon="redo" @click.native="commands.redo" />
          </div>

          <div class="q-px-md right-actions">
            <o-menubar-btn icon="mdi-page-layout-sidebar-right" color="white" @click.native="showSidePanel(true)" flat />
            <o-menubar-btn :icon="isSlideShow ? `mdi-pause-circle-outline` : `mdi-play-box-outline`" :tooltip="$t('presentation')" @click.native="onSlideShow" />
            <o-menubar-btn :icon="$q.fullscreen.isActive ? `fullscreen_exit` : `fullscreen`" :tooltip="$t('action.fullscreen')" @click.native="$q.fullscreen.toggle()" />
          </div>
        </section>
      </editor-menu-bar>

      <q-scroll-area ref="editorScroll" class="editor-scroll-area" :class="`view-${pageView}`">
        <editor-content class="editor__content o--note-preview note-step-side-editor" :editor="editor" />
      </q-scroll-area>
    </section>
  </q-page>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  BulletList,
  CodeBlock,
  CodeBlockHighlight,
  HardBreak,
  // Heading,
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
  OAlign,
  OBackColor,
  OForeColor,
  OHeading,
  OIframe,
  ODiagram,
  OKatexBlock,
  OKatexInline
} from 'src/lib/extentions'

import OForeColorDropdown from 'src/lib/components/buttons/OForeColorDropdown'
import OBackColorDropdown from 'src/lib/components/buttons/OBackColorDropdown'
import OAlignDropdown from 'src/lib/components/buttons/OAlignDropdown'
import OAlignGroup from 'src/lib/components/buttons/OAlignGroup'
import OHeadingDropdown from 'src/lib/components/buttons/OHeadingDropdown'
import OHeadingGroup from 'src/lib/components/buttons/OHeadingGroup'
import OHeadingList from 'src/lib/components/buttons/OHeadingList'

import OMenubarBtn from 'src/lib/components/buttons/OMenubarBtn'
import OCommonItem from 'src/lib/components/common/OCommonItem'

export default {
  name: 'page-tiptap-basic',
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
  components: {
    EditorContent,
    EditorMenuBar,
    OMenubarBtn,
    OCommonItem,
    OForeColorDropdown,
    OBackColorDropdown,
    OAlignDropdown,
    OAlignGroup,
    OHeadingDropdown,
    OHeadingGroup,
    OHeadingList
  },
  methods: {
    initEditor () {
      this.editor = new Editor({
        extensions: [
          new OTitle(),
          new ODoc(),
          new OHeading({ levels: [1, 2, 3, 4, 5] }),
          new OAlign(),
          new OForeColor(),
          new OBackColor(),
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new CodeBlockHighlight({
            languages: {
              java,
              javascript,
              css
            }
          }),
          new HardBreak(),
          new ListItem(),
          new OrderedList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new TodoItem({
            nested: true
          }),
          new TodoList(),
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
          new Focus({
            className: 'has-focus',
            nested: true
          }),
          new HorizontalRule(),
          new TrailingNode({
            node: 'paragraph',
            notAfter: ['paragraph']
          }),
          new Image(),
          new OIframe(),
          new ODiagram(),
          new OKatexBlock(),
          new OKatexInline()
        ],
        autoFocus: true,
        content: '',
        onUpdate: ({ state, getJSON, getHTML }) => {
          this.json = getJSON()
          this.html = getHTML()
        }
      })
    },
    // content
    setContent () {
      // From JSON
      if (!this.json.type) {
        this.json = {
          type: 'doc',
          content: []
        }
      }
      this.editor.setContent(this.json, true)

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
  @import "../../../lib/css/tiptap.styl";

  .editor-scroll-area {
    position absolute
    top 40px
    left 0
    right 0
    bottom 0
    background #f7f8fa
  }
</style>
