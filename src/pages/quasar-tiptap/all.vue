<template>
  <q-page class="page-quasar-tiptap-all">
    <quasar-tiptap v-bind="options" scrollable />
  </q-page>
</template>

<script>
import QuasarTiptap from 'src/lib/components/QuasarTiptap'
import {
  Placeholder,
} from 'tiptap-extensions'

import { RecommendedExtensions } from 'src/lib/extentions'
import { FullFeaturedArticle } from 'src/lib/data/article'

export default {
  name: 'page-quasar-tiptap-all',
  data () {
    return {
      options: {
        content: FullFeaturedArticle,
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
          'add-more',
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
      }
    }
  },
  components: {
    QuasarTiptap
  },
  methods: {
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
  .page-quasar-tiptap-all {
    .editor-scroll-area {
      position absolute
      top 40px
      left 0
      right 0
      bottom 0
      background #f7f8fa
    }

    .editor__content {
      background #fff
      padding 40px 50px
      min-height calc(100vh - 40px)
    }

    .view-page {
      .editor__content {
        max-width 800px
        margin 1rem auto
        box-shadow: 0 1px 10px 2px rgba(0,0,0,.06);
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
      }
    }
  }
</style>
