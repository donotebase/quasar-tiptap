<template>
  <div>
    <q-btn-dropdown menu-anchor="bottom left" menu-self="top left" :menu-offset="[20, 0]"
                    class="o-fore-color-dropdown" content-class="o-fore-color-menu" @click="onSelectCurrent" split flat>
      <section class="row justify-center label" slot="label">
        <div><q-icon name="mdi-format-color-text"/></div>
        <div class="indicator" :style="`background: ${hex}`"></div>
      </section>
      <o-color-board :active-color="activeColor" @select="onSelect" v-close-popup="closable" />
    </q-btn-dropdown>
    <q-tooltip :delay="500">{{$o.lang.editor.textColor}}</q-tooltip>
  </div>
</template>

<script>
import OColorBoard from 'src/components/common/OColorBoard'
import { findActiveMarkAttribute } from 'src/utils/mark'
export default {
  name: 'o-fore-color-dropdown',
  data () {
    return {
      hex: '#ff4d4f',
      closable: false
    }
  },
  props: {
    editor: {
      type: Object
    },
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
    onSelect (color) {
      this.closable = true
      this.hex = color
      this.commands.foreColor({ foreColor: color })
    }
  },
  computed: {
    activeColor () {
      let active = findActiveMarkAttribute(this.editor.state, 'foreColor')
      return active
    }
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
