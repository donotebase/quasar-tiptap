<template>
  <q-btn-dropdown menu-anchor="bottom left" menu-self="top left" :menu-offset="[20, 0]"
                  class="o-fore-color-dropdown" content-class="o-fore-color-menu" @click="onSelectCurrent" split flat>
    <section class="row justify-center label" slot="label">
      <div><q-icon name="mdi-format-color-text"/></div>
      <div class="indicator" :style="`background: ${hex}`"></div>
    </section>
    <o-color-board @select="onSelect" v-close-popup="closable" />
  </q-btn-dropdown>
</template>

<script>
import OColorBoard from '../common/OColorBoard'
export default {
  name: 'o-fore-color-dropdown',
  data () {
    return {
      hex: '#ff0000',
      closable: false
    }
  },
  props: {
    commands: {
      type: Object
    },
    getMarkAttrs: {
      type: Function
    }
  },
  components: {
    OColorBoard
  },
  methods: {
    onSelectCurrent () {
      this.onSelect(this.hex)
    },
    onSelect (value) {
      this.closable = true
      this.hex = value
      this.commands.foreColor({ foreColor: value })
    }
  },
  computed: {
  }
}
</script>

<style lang="stylus">
  .o-fore-color-dropdown {

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

  .o-fore-color-menu {
    .q-color-picker {
      min-width 250px
    }
  }
</style>
