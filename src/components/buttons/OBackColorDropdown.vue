<template>
  <div>
    <q-btn-dropdown menu-anchor="bottom left" menu-self="top left" :menu-offset="[20, 0]"
                    class="o-back-color-dropdown" content-class="o-back-color-menu" @click="onSelectCurrent" split flat>
      <section class="row justify-center label" slot="label">
        <div><q-icon name="mdi-format-color-highlight"/></div>
        <div class="indicator" :style="`background: ${hex}`"></div>
      </section>
      <o-color-board :active-color="activeColor" @select="onSelect" v-close-popup="closable" />
    </q-btn-dropdown>
    <q-tooltip :delay="500">{{$o.lang.editor.highlightColor}}</q-tooltip>
  </div>
</template>

<script>
import OColorBoard from 'src/components/common/OColorBoard'
import { findActiveMarkAttribute } from 'src/utils/mark'
export default {
  name: 'o-back-color-dropdown',
  data () {
    return {
      hex: '#ffec3d',
      closable: false
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
    OColorBoard
  },
  methods: {
    onSelectCurrent () {
      this.onSelect(this.hex)
    },
    onSelect (color) {
      this.closable = true
      this.hex = color
      this.commands.backColor({ backColor: color })
    }
  },
  computed: {
    activeColor () {
      let active = findActiveMarkAttribute(this.editor.state, 'backColor')
      return active
    }
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
      max-width 280px
    }

    .q-color-picker__palette-rows {
      padding 8px
    }

    .q-color-picker__cube {
      margin 3px
      width calc(10% - 6px) !important
      padding-bottom calc(10% - 6px) !important
      border-radius 2px
    }

    .q-color-picker__cube:hover {
      //
      box-shadow: 0px 0px 5px 0px rgba(0,0,0,.2);
    }
  }
</style>
