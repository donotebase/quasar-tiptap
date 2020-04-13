<template>
  <q-btn-dropdown icon="format_align_center" menu-anchor="bottom left" menu-self="top left" class="o-align-dropdown" content-class="o-menu o-align-dropdown-menu" dense flat>
    <q-list>
      <q-item clickable v-close-popup @click.native="commands.align_left()">
        <q-item-section side><q-icon name="format_align_left" /></q-item-section>
        <q-item-section>左对齐</q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click.native="commands.align_center()">
        <q-item-section side><q-icon name="format_align_center" /></q-item-section>
        <q-item-section>居中对齐</q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click.native="commands.align_right()">
        <q-item-section side><q-icon name="format_align_right" /></q-item-section>
        <q-item-section>右对齐</q-item-section>
      </q-item>
      <q-item clickable v-close-popup @click.native="commands.align_justify()">
        <q-item-section side><q-icon name="format_align_justify" /></q-item-section>
        <q-item-section>两端对齐</q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
export default {
  name: 'o-menubar-btn',
  data () {
    return {
    }
  },
  props: {
    commands: {
      type: Object
    }
  },
  methods: {
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
