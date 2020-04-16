<template>
  <div>
    <q-btn-dropdown icon="mdi-format-header-pound" menu-anchor="bottom left" menu-self="top left" class="o-heading-dropdown" content-class="o-menu o-heading-dropdown-menu" flat>
      <o-heading-list :editor="editor" :commands="commands" />
    </q-btn-dropdown>
    <q-tooltip>{{$o.lang.editor.headings}}</q-tooltip>
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

  .o-heading-dropdown-menu {
    .q-list {
      .q-icon {
        font-size 1rem
      }

      .q-item.is-active {
        background rgba(0,0,0,0.03)
        font-weight 600
      }
    }
  }
</style>
