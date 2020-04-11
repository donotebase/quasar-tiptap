<template>
  <section class="o-align-group">
    <o-menubar-btn icon="format_align_left" :class="{ 'is-active': isActive.align({ textAlign: 'left' }) }" @click.native="commands.align({ textAlign: 'left' })" />
    <o-menubar-btn icon="format_align_center" :class="{ 'is-active': isActive.align({ textAlign: 'center' }) }" @click.native="commands.align({ textAlign: 'center' })" />
    <o-menubar-btn icon="format_align_right" :class="{ 'is-active': isActive.align({ textAlign: 'right' }) }" @click.native="commands.align({ textAlign: 'right' })" />
  </section>
</template>

<script>
import OMenubarBtn from 'src/lib/components/buttons/OMenubarBtn'
export default {
  name: 'o-align-group',
  data () {
    return {
    }
  },
  props: {
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
    onTest () {
      console.log('test', this.isActive)
    }
  },
  computed: {
  }
}
</script>

<style lang="stylus">
  .o-align-group {
  }
</style>
