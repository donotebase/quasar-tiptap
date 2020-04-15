<template>
  <q-btn class="o-menubar-btn"
         :label="label" :to="to" flat>
    <q-icon :name="icon" v-if="icon" />
    <q-tooltip :delay="tipDelay" v-if="tooltip">
      {{tooltip}}
    </q-tooltip>
    <q-tooltip anchor="center right" self="center left" v-if="vtooltip">
      {{vtooltip}}
    </q-tooltip>
    <slot></slot>
  </q-btn>
</template>

<script>
export default {
  name: 'o-menubar-btn',
  data () {
    return {
    }
  },
  props: {
    to: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    tooltip: {
      type: String,
      default: ''
    },
    vtooltip: {
      type: String,
      default: ''
    },
    tipDelay: {
      type: Number,
      default: 500
    }
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style lang="stylus">
  .o-menubar-btn {
    padding 0px
    font-weight 400
    min-width 30px
    min-height unset
  }
  .o-menubar-btn.is-active {
    background rgba(255,255,255,0.2)
  }
</style>
