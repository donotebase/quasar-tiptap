<template>
  <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, getMarkAttrs, focused }">
    <section class="row col-12 justify-between items-center bg-light tiptap-menubar">
      <div class="row q-px-xs menubar is-hidden" :class="{ 'is-focused': focused }">
        <template v-for="(item, index) of toolbar">
          <o-simple-command-btn :name="item" :commands="commands" :is-active="isActive" :key="index" v-if="isSimpleCommand(item)" />
          <q-separator vertical inset :key="index" v-else-if="item==='separator'" />
          <o-fore-color-dropdown :commands="commands" :get-mark-attrs="getMarkAttrs" :key="index" v-else-if="item==='fore-color'" />
          <o-back-color-dropdown :commands="commands" :key="index" v-else-if="item==='back-color'" />
          <o-font-family-dropdown :commands="commands" :key="index" v-else-if="item==='font-family'" />
          <o-align-dropdown :commands="commands" :key="index" v-else-if="item==='align-dropdown'" />
          <o-align-group :commands="commands" :is-active="isActive" :key="index" v-else-if="item==='align-group' && false" />
          <o-heading-dropdown :commands="commands" :is-active="isActive" :key="index" v-else-if="item==='heading'" />
          <o-menubar-btn icon="photo" :key="index" v-else-if="item==='photo'">
            <q-menu ref="picturePopover" anchor="bottom middle" self="top middle" class="shadow-5">
              <o-meta-input :title="$t('action.picture')" icon="image"
                            @primaryAction="insertImage(commands.image, $event);$refs.picturePopover.hide()">
              </o-meta-input>
            </q-menu>
          </o-menubar-btn>
          <o-menubar-btn icon="add" :tooltip="$t('add')" :key="index" v-else-if="item==='add-more'">
            <q-menu ref="addPopover" v-model="menu.add" anchor="bottom left" self="top left" content-class="o-menu">
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
      </div>
    </section>
  </editor-menu-bar>
</template>

<script>
import { EditorMenuBar } from 'tiptap'

import OForeColorDropdown from 'src/lib/components/buttons/OForeColorDropdown'
import OBackColorDropdown from 'src/lib/components/buttons/OBackColorDropdown'
import OFontFamilyDropdown from 'src/lib/components/buttons/OFontFamilyDropdown'
import OAlignDropdown from 'src/lib/components/buttons/OAlignDropdown'
import OAlignGroup from 'src/lib/components/buttons/OAlignGroup'
import OHeadingDropdown from 'src/lib/components/buttons/OHeadingDropdown'
import OHeadingGroup from 'src/lib/components/buttons/OHeadingGroup'
import OHeadingList from 'src/lib/components/buttons/OHeadingList'

import OMenubarBtn from 'src/lib/components/buttons/OMenubarBtn'
import OSimpleCommandBtn from 'src/lib/components/buttons/OSimpleCommandBtn'
import OCommonItem from 'src/lib/components/common/OCommonItem'
import OMetaInput from 'src/lib/components/common/OMetaInput'

export default {
  name: 'page-quasar-tiptap-all',
  data () {
    return {
      simpleCommands: [
        'bold',
        'italic',
        'strike',
        'underline',
        'blockquote',
        'code',
        'code_block',
        'horizontal',
        'bullet_list',
        'ordered_list',
        'todo_list',
        'table',
        'undo',
        'redo',
        'indent',
        'outdent',
      ],
      pageView: 'page',
      menu: {
        add: false
      },
      isSlideShow: false
    }
  },
  props: {
    editor: {
      type: Object
    },
    toolbar: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {
    EditorMenuBar,
    OMenubarBtn,
    OSimpleCommandBtn,
    OCommonItem,
    OMetaInput,
    OForeColorDropdown,
    OBackColorDropdown,
    OFontFamilyDropdown,
    OAlignDropdown,
    OAlignGroup,
    OHeadingDropdown,
    OHeadingGroup,
    OHeadingList
  },
  methods: {
    isSimpleCommand (item) {
      return this.simpleCommands.indexOf(item) >= 0
    },
    insertImage (command, src) {
      if (src) {
        command({ src })
      }
    },
    insertIframe (command, src) {
      if (src) {
        command({ src })
      }
    },
    showSidePanel () {},
    onSlideShow () {}
  },
  mounted: function () {
  },
  deactivated () {
  },
  beforeDestroy () {
  }
}
</script>

<style lang="stylus">
</style>
