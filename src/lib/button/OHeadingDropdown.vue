<template>
  <q-btn-dropdown icon="mdi-format-header-pound" menu-anchor="bottom left" menu-self="top left" class="o-heading-dropdown" content-class="o-menu o-heading-dropdown-menu" flat>
    <o-heading-list :commands="commands" :is-active="isActive" />
  </q-btn-dropdown>
</template>

<script>
import OHeadingList from 'src/lib/button/OHeadingList'
export default {
  name: 'o-heading-dropdown',
  data () {
    return {
    }
  },
  props: {
    commands: {
      type: Object
    },
    isActive: {
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
        font-size 1.4rem
      }

      .q-item.is-active {
        background rgba(0,0,0,0.03)
        font-weight 600
      }
    }
  }
</style>
