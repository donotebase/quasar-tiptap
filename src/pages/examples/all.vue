<template>
  <q-page class="page-quasar-tiptap-all">
    <quasar-tiptap v-bind="options" scrollable>
      <template slot="toolbar-left">
        <q-separator vertical inset />
        <o-menubar-btn icon="mdi-overscan"
                       :tooltip="$t('page.view.full')"
                       :class="{ 'is-active': options.pageView === 'full' }"
                       @click.native="options.pageView='full'" />
        <o-menubar-btn icon="mdi-fit-to-page-outline"
                       :tooltip="$t('page.view.page')"
                       :class="{ 'is-active': options.pageView === 'page' }"
                       @click.native="options.pageView='page'" />
      </template>
      <template slot="toolbar-right">
        <o-menubar-btn :icon="isSlideShow ? `mdi-pause-circle-outline` : `mdi-play-box-outline`"
                       :tooltip="$t('presentation')" @click.native="onSlideShow" />
        <o-menubar-btn :icon="$q.fullscreen.isActive ? `fullscreen_exit` : `fullscreen`"
                       :tooltip="$t('action.fullscreen')" @click.native="$q.fullscreen.toggle()" />
      </template>
    </quasar-tiptap>
  </q-page>
</template>

<script>
import { QuasarTiptap, OMenubarBtn } from 'src/index'
import {
  Placeholder,
} from 'tiptap-extensions'

import { RecommendedExtensions } from 'src/extentions'
import { FullFeaturedArticle } from 'src/data/article'

export default {
  name: 'page-quasar-tiptap-all',
  data () {
    return {
      options: {
        content: FullFeaturedArticle,
        editable: true,
        pageView: 'page',
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
      },
      isSlideShow: false
    }
  },
  components: {
    QuasarTiptap,
    OMenubarBtn,
  },
  methods: {
    onSlideShow () {}
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
