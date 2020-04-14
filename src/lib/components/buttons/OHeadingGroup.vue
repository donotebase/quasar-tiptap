<template>
  <section class="o-heading-group">
    <o-menubar-btn icon="mdi-format-pilcrow" :class="{ 'is-active': isActive.paragraph() }" @click.native="commands.paragraph" />
    <o-menubar-btn v-for="level of maxLevel" :key="level"
      :label="`H${level}`"
      :class="{ 'is-active': isActive.heading({ level: level }) }"
      @click.native="commands.heading({ level: level })" />
  </section>
</template>

<script>
import OMenubarBtn from './OMenubarBtn'
export default {
  name: 'o-heading-group',
  data () {
    return {
    }
  },
  props: {
    max: {
      type: Number,
      default: 3
    },
    commands: {
      type: Object
    },
    isActive: {
      type: Object
    }
  },
  components: {
    OMenubarBtn
  },
  methods: {
  },
  computed: {
    maxLevel () {
      let max = this.max
      if (this.max < 1) max = 3
      if (this.max > 5) max = 5

      return max
    }
  }
}
</script>

<style lang="stylus">
  .o-heading-group {
  }
</style>
