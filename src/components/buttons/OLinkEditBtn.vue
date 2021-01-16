<template>
  <o-menubar-btn icon="edit" :tooltip="$o.lang.link.edit" class="o-link-edit-btn">
    <q-menu ref="linkPopover"
            anchor="bottom middle"
            self="top middle"
            class="shadow-5" @show="onShow">
      <o-meta-input :val="href" :title="$o.lang.link.edit" icon="link"
                    @primaryAction="insertLink(commands.link, $event)">
        <div slot="header-right">
          <q-checkbox v-model="openInNewTab" :label="$o.lang.link.open_in_new_tab" />
        </div>
      </o-meta-input>
    </q-menu>
  </o-menubar-btn>
</template>

<script>
import OMenubarBtn from 'src/components/buttons/OMenubarBtn'
import OMetaInput from 'src/components/common/OMetaInput'
export default {
  name: 'o-link-edit-btn',
  data () {
    return {
      href: '',
      openInNewTab: true
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
      if (link && link.href) {
        this.href = link.href
        this.openInNewTab = link.openInNewTab
      }
    },
    insertLink (command, href) {
      command({
        href: href,
        openInNewTab: this.openInNewTab
      })
    }
  },
  computed: {
  }
}
</script>

<style lang="stylus">
  .o-link-edit-btn {
  }
</style>
