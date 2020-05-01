<template>
  <div>
    <q-btn-dropdown icon="mdi-format-header-pound" menu-anchor="bottom left" menu-self="top left" class="o-heading-dropdown" content-class="o-menu o-heading-dropdown-menu" flat>
      <o-heading-list :editor="editor" :commands="commands" />
    </q-btn-dropdown>
    <q-tooltip :delay="500">{{$o.lang.editor.headings}}</q-tooltip>
  </div>
</template>

<script>
import OHeadingList from 'src/components/buttons/OHeadingList'
export default {
  name: 'o-heading-dropdown',
  data () {
    return {
    }
  },
  props: {
    editor: {
      type: Object
    },
    commands: {
      type: Object
    }
  },
  components: {
    OHeadingList
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style lang="stylus">
  .o-heading-dropdown {
    padding 4px

    .q-btn-dropdown__arrow {
      margin-left 0
    }
  }
</style>
