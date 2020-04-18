<template>
  <section class="o-align-group">
    <o-menubar-btn v-for="(item, index) in alignments" :key="index"
                   :icon="`format_align_${item.value}`"
                   :tooltip="item.label"
                   :class="{ 'is-active': isActive(item.value) }"
                   @click.native="item.command({ textAlign: item.value })" />
  </section>
</template>

<script>
import OMenubarBtn from 'src/components/buttons/OMenubarBtn'
import { isNodeActive } from 'src/utils/node'
export default {
  name: 'o-align-group',
  data () {
    return {
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
    OMenubarBtn
  },
  methods: {
    isActive (alignment) {
      return isNodeActive(this.editor.state, 'textAlign', alignment)
    }
  },
  computed: {
    alignments () {
      return [
        { label: this.$o.lang.editor.left, value: 'left', command: this.commands.alignment },
        { label: this.$o.lang.editor.center, value: 'center', command: this.commands.alignment },
        { label: this.$o.lang.editor.right, value: 'right', command: this.commands.alignment },
      ]
    }
  }
}
</script>

<style lang="stylus">
  .o-align-group {
  }
</style>
