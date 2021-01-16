<template>
  <o-menubar-btn icon="link_off"
                 :tooltip="$o.lang.link.off"
                 @click.native="onLinkOff"
                 class="o-link-off-btn" />
</template>

<script>
import OMenubarBtn from 'src/components/buttons/OMenubarBtn'
import OMetaInput from 'src/components/common/OMetaInput'
export default {
  name: 'o-link-off-btn',
  data () {
    return {
      href: ''
    }
  },
  props: {
    commands: {
      type: Object
    },
    isActive: {
      type: Object
    },
    getMarkAttrs: {
      type: Function
    }
  },
  components: {
    OMenubarBtn,
    OMetaInput
  },
  methods: {
    onLinkOff () {
      this.commands.link({ href: '' })
    }
  },
  computed: {
  }
}
</script>

<style lang="stylus">
  .o-link-off-btn {
  }
</style>
