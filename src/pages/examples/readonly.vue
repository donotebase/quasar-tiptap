<template>
  <q-page class="page-quasar-tiptap-basic">
    <section class="row col-12 justify-center">
      <header class="row col-12 justify-center items-center bg-blue text-white banner">
        <span class="text-h3">Read Only</span>
      </header>
      <section class="row col-10 q-pa-md">
        <quasar-tiptap v-bind="options" />
      </section>
    </section>
  </q-page>
</template>

<script>
import { QuasarTiptap } from 'src/index'

import { BasicFeaturesArticle } from 'src/data/article'
import { RecommendedExtensions } from 'src/extentions'

export default {
  name: 'page-quasar-tiptap-basic',
  data () {
    return {
      options: {
        content: BasicFeaturesArticle,
        editable: false,
        showToolbar: false,
        extensions: [
          ...RecommendedExtensions
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
