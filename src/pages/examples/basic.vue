<template>
  <q-page class="page-quasar-tiptap-basic">
    <section class="row col-12 justify-center">
      <header class="row col-12 justify-center items-center bg-blue-1 text-blue banner">
        <span class="text-h3">Basic</span>

        <div class="row col-12 options">
          <q-toggle v-model="options.editable" label="Editable" />
          <q-toggle v-model="options.showToolbar" label="Toolbar" />
          <q-toggle v-model="options.showBubble" label="Menu Bubble" />
        </div>
      </header>
      <section class="row col-10 q-pa-md">
        <quasar-tiptap ref="editor" v-bind="options" @update="onUpdate" />
      </section>
    </section>
  </q-page>
</template>

<script>
import { QuasarTiptap } from 'src/index'
import {
  Placeholder,
} from 'tiptap-extensions'

import { RecommendedExtensions } from 'src/extentions'
import { BasicFeaturesArticle, BasicFeaturesArticleJson } from 'src/data/article'

import OLinkBtn from 'src/components/buttons/OLinkBtn'

import { DEFAULT_LOCALE } from 'src/i18n'

export default {
  name: 'page-quasar-tiptap-basic',
  data () {
    return {
      options: {
        content: BasicFeaturesArticle,
        editable: true,
        showToolbar: true,
        showBubble: true,
        extensions: [
          // TipTap
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

          // QuasarTipTap
          // 'OTitle',
          // 'ODoc',
          'OParagraph',
          'OBlockquote',
          'OTodoItem',
          'OHeading',
          'OAlignment',
          'OIndent',
          'OLineHeight',
          'OForeColor',
          'OBackColor',
          'OFontFamily',
          'OIframe',
          'ODiagram',
          'OKatexBlock',
          'OKatexInline',
          'OFormatClear',
          'OPrint',
          'OImage',
          'OEmbed',
          new Placeholder({
            showOnlyCurrent: false,
            emptyNodeText: node => {
              if (node.type.name === 'title') {
                return 'Title'
              }
              return 'Content'
            }
          }),
        ],
        toolbar: [ // 1.name 2.object 3.component
          {
            name: 'add-more', // use object with options
            type: 'menu',
            options: {
              embed: {
                video: ['youtube', 'bilibili', 'youku'],
                map: ['google_map', 'amap', 'baidu_map'],
                design: ['modao', 'lanhu', 'figma', 'canva', 'processon'],
                develop: ['codepen'],
                data: ['google_forms', 'jinshuju'],
                others: ['iframe']
              }
            }
          },
          'separator',
          'bold',
          'italic',
          {
            name: 'text-format-dropdown',
            type: 'menu',
            options: {
              list: [
                'underline',
                'strike',
                'code',
              ]
            }
          },
          'separator',
          'heading',
          'font-family',
          'fore-color',
          'back-color',
          'format_clear',
          'separator',
          'align-dropdown',
          'indent-dropdown',
          'line-height',
          'separator',
          'horizontal',
          'list-dropdown',
          'separator',
          'blockquote',
          'code_block',
          // 'link',
          OLinkBtn, // use custom component
          'photo',
          'table',
          'separator',
          'print',
        ],
        bubble: [
          'bold',
          'italic',
          'separator',
          'font-family',
          'fore-color',
          'back-color',
          'separator',
          'link',
          'separator',
          'align-group',
        ]
      },
      json: '',
      html: ''
    }
  },
  components: {
    QuasarTiptap,
    OLinkBtn
  },
  methods: {
    onUpdate ({ state, getJSON, getHTML }) {
      this.json = getJSON()
      this.html = getHTML()
      console.log('html', this.html)
      // console.log('json', JSON.stringify(this.json))
    }
  },
  mounted () {
    this.$o.lang.set(DEFAULT_LOCALE)
    // console.log('editor', this.$refs.editor.editor)
  },
  deactivated () {
  },
  beforeDestroy () {
  }
}
</script>

<style lang="stylus">
  .page-quasar-tiptap-basic {
    .banner {
      position relative
      height 100px

      .options {
        position absolute
        bottom 0
        height 40px
        padding 0 1rem
      }
    }

    .tiptap {
      border solid 1px #eeeeee
      border-radius 6px
    }

    .editor-scroll-area {
      position absolute
      top 40px
      left 0
      right 0
      bottom 0
      background #f7f8fa
    }
  }
</style>
