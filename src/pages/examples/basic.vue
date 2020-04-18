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

import OAddMoreBtn from 'src/components/buttons/OAddMoreBtn'

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
      // console.log('json', JSON.stringify(this.json))
    }
  },
  mounted () {
    this.$o.lang.set('zh-hans')
    console.log('editor', this.$refs.editor.editor)
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
