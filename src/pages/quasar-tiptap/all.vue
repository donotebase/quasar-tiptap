<template>
  <q-page class="page-quasar-tiptap-all">
    <quasar-tiptap :content="content" />
  </q-page>
</template>

<script>
import QuasarTiptap from 'src/lib/components/QuasarTiptap'

import { FullFeaturedArticle } from 'src/lib/data/article'

export default {
  name: 'page-quasar-tiptap-all',
  data () {
    return {
      content: FullFeaturedArticle
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
</style>
