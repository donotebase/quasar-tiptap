<template>
  <q-btn-dropdown icon="format_align_center" menu-anchor="bottom left" menu-self="top left" class="o-align-dropdown" content-class="o-menu o-align-dropdown-menu" dense flat>
    <q-list>
      <q-item :class="{ 'is-active': isActive('left') }" @click.native="commands.align_left()" clickable v-close-popup>
        <q-item-section side><q-icon name="format_align_left" /></q-item-section>
        <q-item-section>左对齐</q-item-section>
      </q-item>
      <q-item :class="{ 'is-active': isActive('center') }" @click.native="commands.align_center()" clickable v-close-popup>
        <q-item-section side><q-icon name="format_align_center" /></q-item-section>
        <q-item-section>居中对齐</q-item-section>
      </q-item>
      <q-item :class="{ 'is-active': isActive('right') }" @click.native="commands.align_right()" clickable v-close-popup>
        <q-item-section side><q-icon name="format_align_right" /></q-item-section>
        <q-item-section>右对齐</q-item-section>
      </q-item>
      <q-item :class="{ 'is-active': isActive('justify') }" @click.native="commands.align_justify()" clickable v-close-popup>
        <q-item-section side><q-icon name="format_align_justify" /></q-item-section>
        <q-item-section>两端对齐</q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import { isNodeActive } from '../../utils/node'
export default {
  name: 'o-align-dropdown',
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
  methods: {
    isActive (alignment) {
      return isNodeActive(this.editor.state, 'textAlign', alignment)
    }
  },
  computed: {
  }
}
</script>

<style lang="stylus">
  .o-align-dropdown {
    padding 4px

    .q-btn-dropdown__arrow {
      margin-left 0
    }
  }

  .o-align-dropdown-menu {
    .q-list {
      .q-icon {
        font-size 1rem
      }
    }
  }
</style>
