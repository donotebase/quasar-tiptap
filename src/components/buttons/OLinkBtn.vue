<template>
  <o-menubar-btn icon="link" :tooltip="$o.lang.editor.hyperlink" class="o-link-btn">
    <q-menu ref="linkPopover"
            anchor="bottom middle"
            self="top middle"
            class="shadow-5" @show="onShow">
      <o-meta-input :val="href" :title="$o.lang.editor.hyperlink" icon="link"
                    @primaryAction="insertLink(commands.link, $event)">
      </o-meta-input>
    </q-menu>
  </o-menubar-btn>
</template>

<script>
import OMenubarBtn from 'src/components/buttons/OMenubarBtn'
import OMetaInput from 'src/components/common/OMetaInput'
export default {
  name: 'o-link-btn',
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
    onShow () {
      this.href = ''

      let link = this.getMarkAttrs('link')
      if (link) {
        this.href = link.href
      }
    },
    insertLink (command, href) {
      command({ href })
    }
  },
  computed: {
  }
}
</script>

<style lang="stylus">
  .o-photo-btn {
  }
</style>
