<template>
  <section class="o-block-card" :class="{ 'fullscreen': fullScreen, 'selected': selected }">
    <section class="row col-12 o-card-toolbar" v-if="toolbar">
      <div class="row col">
        <div class="q-px-sm" v-if="fullScreen">
          <q-btn icon="keyboard_arrow_left" :label="$o.lang.label.back" class="full-height" flat @click="onToggleScreen" />
        </div>
        <div class="col">
          <slot name="toolbar-left"></slot>
        </div>
      </div>
      <div class="row col-auto q-pl-sm">
        <q-btn icon="fullscreen" dense flat @click="onToggleScreen">
          <q-tooltip anchor="top middle" self="bottom middle">{{$o.lang.editor.toggleFullscreen}}</q-tooltip>
        </q-btn>
        <slot name="toolbar-right"></slot>
      </div>
    </section>
    <section class="o-card-inner-toolbar" v-else>
      <q-btn icon="fullscreen" color="blue" round flat @click="onToggleScreen">
        <q-tooltip anchor="top middle" self="bottom middle">{{$o.lang.editor.toggleFullscreen}}</q-tooltip>
      </q-btn>
    </section>

    <section class="o-card-content" @click="select">
      <slot></slot>
    </section>
  </section>
</template>

<script>
import { NodeSelection } from 'prosemirror-state'
/**
 * Card for block content, includes
 * - toolbar
 * - content container
 * - fullscreen
 */
export default {
  name: 'o-block-card',
  data () {
    return {
      fullScreen: false
    }
  },
  props: {
    view: {},
    getPos: {},
    selected: {
      type: Boolean
    },
    toolbar: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onToggleScreen () {
      this.fullScreen = !this.fullScreen

      this.$emit('toggle-screen', this.fullScreen)
    },
    select () {
      const { state } = this.view
      let { tr } = state
      const selection = NodeSelection.create(state.doc, this.getPos())
      tr = tr.setSelection(selection)
      this.view.dispatch(tr)
    }
  },
  computed: {
  }
}
</script>

<style lang="stylus">
  .o-block-card {
    position relative
    min-height 40px
    background #ffffff

    .o-card-toolbar {
      position absolute
      top -44px
      width 100%
      height 40px
      margin 4px 0
      background #efefef
      border-radius 5px
      visibility hidden

      img {
        width 24px
        height 24px
      }

      .q-field {
        .q-field__control, .q-field__marginal {
          height 40px
        }

        .q-field__suffix {
          line-height unset
        }
      }
      .q-field--focused, .q-field--float {
        .q-field__control {
          box-shadow unset !important
        }
        .q-field__native, .q-field__suffix, .q-field__append {
          color black
        }
      }

      .dropdown-menu {
        .q-btn-dropdown__arrow {
          margin-left 0
        }
      }

      .actions {
        //
        .q-btn {
          min-width 40px
        }
      }
    }

    .o-card-inner-toolbar {
      position absolute
      top 10px
      right 10px
      visibility hidden
    }

    .o-card-content {
      iframe {
        display block
      }
    }

    &.fullscreen {
      position fixed
      top 0
      left 0
      right 0
      bottom 0
      background white
      z-index 3000

      .o-card-toolbar {
        position relative
        top 0
        margin 0
        visibility visible
      }
    }

    &.selected {
      .o-card-toolbar {
        visibility visible
      }
    }

    &.no-data {
      .o-card-toolbar {
        visibility visible
      }
    }

    &:hover {
      .o-card-toolbar {
        visibility visible
      }
      .o-card-inner-toolbar {
        visibility visible
        z-index 1000
      }
      .o-card-content {
        background rgba(0,0,0,0.02)
      }
    }
  }
</style>
