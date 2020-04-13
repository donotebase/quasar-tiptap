<template>
  <q-page class="page-quasar-tiptap-basic">
    <section class="row col-12 justify-center">
      <header class="row col-12 justify-center items-center bg-blue text-white banner">
        <span class="text-h3">Basic</span>
      </header>
      <section class="row col-10 q-pa-md">
        <quasar-tiptap :content="content" :toolbar="toolbar" />
      </section>
    </section>
  </q-page>
</template>

<script>
import QuasarTiptap from 'src/lib/components/QuasarTiptap'

import { BasicFeaturesArticle } from 'src/lib/data/article'

export default {
  name: 'page-quasar-tiptap-all',
  data () {
    return {
      content: BasicFeaturesArticle,
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
        'separator',
        'align-dropdown',
        'align-group',
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
