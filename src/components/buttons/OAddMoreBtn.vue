<template>
  <o-menubar-btn icon="add" :tooltip="$t('add')" class="o-add-more-btn">
    <q-menu ref="addPopover" anchor="bottom left" self="top left" content-class="o-menu">
      <section>
        <o-common-item icon="mdi-code-braces" :label="$t('code_block')" @click.native="commands.code_block" v-close-popup />
        <o-common-item icon="mdi-sigma" :label="$t('formula')" :side-label="$t('block')" @click.native="commands.katex_block" v-close-popup />
        <o-common-item icon="mdi-sigma" :label="$t('formula')" :side-label="$t('inline')" @click.native="commands.katex_inline" v-close-popup />
        <o-common-item icon="mdi-sitemap" :label="$t('diagram.text')" @click.native="commands.diagram" v-close-popup>
          <q-tooltip anchor="center right" self="center left">
            <div class="text-bold">Mermaid</div>
            <div class="text-white">{{$t('diagram.text.tips')}}</div>
          </q-tooltip>
        </o-common-item>
        <q-separator />
        <o-common-item icon="mdi-iframe" :label="$t('iframe')">
          <q-menu ref="iframePopover" anchor="top right" self="top left" class="shadow-5">
            <o-meta-input :title="$t('iframe')" icon="link"
                          @primaryAction="insertIframe(commands.iframe, $event)">
            </o-meta-input>
          </q-menu>
        </o-common-item>
      </section>
    </q-menu>
  </o-menubar-btn>
</template>

<script>
import OMenubarBtn from 'src/components/buttons/OMenubarBtn'
import OCommonItem from 'src/components/common/OCommonItem'
import OMetaInput from 'src/components/common/OMetaInput'
export default {
  name: 'o-add-more-btn',
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
    OMenubarBtn,
    OCommonItem,
    OMetaInput
  },
  methods: {
    insertIframe (command, src) {
      if (src) {
        command({ src })
      }
    }
  },
  computed: {
  }
}
</script>

<style lang="stylus">
  .o-add-more-btn {
  }
</style>
