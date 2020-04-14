<template>
  <q-page class="page-quasar-tiptap-basic">
    <section class="row col-12 justify-center">
      <header class="row col-12 justify-center items-center bg-blue text-white banner">
        <span class="text-h3">Basic</span>
      </header>
      <section class="row col-10 q-pa-md">
        <quasar-tiptap v-bind="options" @update="onUpdate" />
      </section>
    </section>
  </q-page>
</template>

<script>
import QuasarTiptap from 'src/lib/components/QuasarTiptap'
import {
  Placeholder,
} from 'tiptap-extensions'

import { RecommendedExtensions } from 'src/lib/extentions'
import { BasicFeaturesArticle } from 'src/lib/data/article'

import OAddMoreBtn from 'src/lib/components/buttons/OAddMoreBtn'

export default {
  name: 'page-quasar-tiptap-basic',
  data () {
    return {
      options: {
        content: BasicFeaturesArticle,
        editable: true,
        extensions: [
          ...RecommendedExtensions,
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
        toolbar: [
          OAddMoreBtn,
          'separator',
          'bold',
          'italic',
          'underline',
          'strike',
          'code',
          'separator',
          'heading',
          'font-family',
          'fore-color',
          'back-color',
          'format_clear',
          'separator',
          'align-dropdown',
          'indent',
          'outdent',
          'line-height',
          'separator',
          'horizontal',
          'bullet_list',
          'ordered_list',
          'todo_list',
          'separator',
          'blockquote',
          'code_block',
          'photo',
          'table',
          'separator',
          'undo',
          'redo',
        ]
      },
      json: '',
      html: ''
    }
  },
  components: {
    QuasarTiptap,
    OAddMoreBtn
  },
  methods: {
    onUpdate ({ state, getJSON, getHTML }) {
      this.json = getJSON()
      this.html = getHTML()
      console.log('html', this.html)
    }
  },
  mounted: function () {
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
      height 100px
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
