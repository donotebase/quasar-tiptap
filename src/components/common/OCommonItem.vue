<template>
  <q-item class="o-common-item" :class="dense ? 'dense' : ''" :to="to" clickable :v-close-popup="closable" exact>
    <q-item-section avatar>
      <q-avatar :size="size" :icon="icon" :textColor="color" class="themed" />
    </q-item-section>
    <q-item-section class="q-pr-md">
      <q-item-label>{{label}}</q-item-label>
      <q-item-label caption v-if="sublabel">{{sublabel}}</q-item-label>
    </q-item-section>
    <q-item-section side v-if="sideIcon">
      <q-avatar :size="size" :icon="sideIcon" />
    </q-item-section>
    <q-item-section side v-if="sideLabel">
      <q-item-label class="q-pr-md">{{sideLabel}}</q-item-label>
      <q-item-label caption v-if="sideSublabel">{{sideSublabel}}</q-item-label>
    </q-item-section>
    <slot></slot>
  </q-item>
</template>

<script>
export default {
  name: 'o-common-item',
  data () {
    return {
    }
  },
  props: {
    closable: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '2.4rem'
    },
    color: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'apps'
    },
    label: {
      type: String,
      default: 'Label'
    },
    sublabel: {
      type: String,
      default: ''
    },
    sideIcon: {
      type: String,
      default: ''
    },
    sideLabel: {
      type: String,
      default: ''
    },
    sideSublabel: {
      type: String,
      default: ''
    }
  },
  methods: {
    onConfirm () {
      this.$emit('confirm', this.value)
    }
  },
  computed: {
    textColor () {
      return this.color + '-10'
    }
  }
}
</script>

<style lang="stylus">
  .o-common-item {
    padding 0
    min-height unset
    .q-item__section--avatar {
      min-width unset
    }

    .q-item__section--side {
     font-size 0.8rem
     padding-right 0
    }
    .q-item__section--main ~ .q-item__section--side {
      padding-left 0
    }
  }

  .o-common-item.dense {
    min-height unset

    .q-avatar {
      font-size 2.4rem !important
    }
  }
</style>
