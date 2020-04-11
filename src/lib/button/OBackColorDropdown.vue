<template>
  <q-btn-dropdown menu-anchor="bottom left" menu-self="top left" class="o-back-color-dropdown" content-class="o-back-color-menu" @click="onSelectCurrent" split flat>
    <section class="row justify-center label" slot="label">
      <div><q-icon name="mdi-format-color-highlight"/></div>
      <div class="indicator" :style="`background: ${hex}`"></div>
    </section>
    <q-color v-model="hex" default-view="palette" @change="onSelect" v-close-popup="closable" />
  </q-btn-dropdown>
</template>

<script>
export default {
  name: 'o-back-color-dropdown',
  data () {
    return {
      hex: '#ffff00',
      closable: false
    }
  },
  props: {
    commands: {
      type: Object
    }
  },
  methods: {
    onSelectCurrent () {
      this.onSelect(this.hex)
    },
    onSelect (value) {
      this.closable = true
      this.commands.backColor({ backColor: value })
    }
  },
  computed: {
  }
}
</script>

<style lang="stylus">
  .o-back-color-dropdown {

    .q-btn-dropdown__arrow {
      margin-left 0
    }

    .q-btn:first-child {
      padding 0 2px 0 4px
    }
    .q-btn:last-child {
      padding 0 0px 0 2px
    }
    .q-btn-dropdown__arrow-container {
      border none
    }

    .label {
      width 20px
      height 20px
      margin-top -2px

      .q-icon {
        margin-top -8px
        font-size 1.2rem
      }
      .indicator {
        width 14px
        height 3px
        margin-top -8px
      }
    }
  }

  .o-back-color-menu {
    .q-color-picker {
      min-width 250px
    }
  }
</style>
