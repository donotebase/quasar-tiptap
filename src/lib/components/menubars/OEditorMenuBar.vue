<template>
  <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, getMarkAttrs, focused }">
    <section class="row col-12 justify-between items-center bg-light tiptap-menubar">
      <div class="row q-px-xs menubar is-hidden" :class="{ 'is-focused': focused }">
        <o-menubar-btn icon="add" :tooltip="$t('add')" class="note-step-add">
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

        <q-separator vertical inset />
        <o-menubar-btn icon="mdi-format-bold" tooltip="Bold" :class="{ 'is-active': isActive.bold() }" @click.native="commands.bold" />
        <o-menubar-btn icon="format_italic" :class="{ 'is-active': isActive.italic() }" @click.native="commands.italic" />
        <o-menubar-btn icon="format_strikethrough" :class="{ 'is-active': isActive.strike() }" @click.native="commands.strike" />
        <o-menubar-btn icon="format_underline" :class="{ 'is-active': isActive.underline() }" @click.native="commands.underline" />
        <o-menubar-btn icon="code" :class="{ 'is-active': isActive.code() }" @click.native="commands.code" />

        <q-separator vertical inset />
        <o-fore-color-dropdown :commands="commands" :get-mark-attrs="getMarkAttrs" />
        <o-back-color-dropdown :commands="commands" />

        <q-separator vertical inset />
        <o-align-dropdown :commands="commands" />

        <q-separator vertical inset />
        <o-heading-dropdown :commands="commands" :is-active="isActive" />
        <o-heading-group :max="3" :commands="commands" :is-active="isActive" v-if="false" />

        <q-separator vertical inset />
        <o-menubar-btn icon="remove" @click.native="commands.horizontal_rule" />
        <o-menubar-btn icon="format_list_bulleted" :class="{ 'is-active': isActive.bullet_list() }" @click.native="commands.bullet_list" />
        <o-menubar-btn icon="format_list_numbered" :class="{ 'is-active': isActive.ordered_list() }" @click.native="commands.ordered_list" />
        <o-menubar-btn icon="mdi-format-list-checks" :class="{ 'is-active': isActive.todo_list() }" @click.native="commands.todo_list" />

        <q-separator vertical inset />
        <o-menubar-btn icon="format_quote" :class="{ 'is-active': isActive.blockquote() }" @click.native="commands.blockquote" />
        <o-menubar-btn icon="mdi-code-braces" :class="{ 'is-active': isActive.code_block() }" @click.native="commands.code_block" />
        <o-menubar-btn icon="photo">
          <q-menu ref="picturePopover" anchor="bottom middle" self="top middle" class="shadow-5">
            <o-meta-input :title="$t('action.picture')" icon="image"
                        @primaryAction="insertImage(commands.image, $event);$refs.picturePopover.hide()">
            </o-meta-input>
          </q-menu>
        </o-menubar-btn>

        <q-separator vertical inset />
        <o-menubar-btn icon="mdi-table" @click.native="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })" />

        <div v-if="false">
          <q-separator vertical inset />
          <o-menubar-btn icon="mdi-overscan" :tooltip="$t('page.view.full')" :class="pageView==='full'?'is-active':''" @click.native="pageView='full'" />
          <o-menubar-btn icon="mdi-fit-to-page-outline" :tooltip="$t('page.view.page')" :class="pageView==='page'?'is-active':''" @click.native="pageView='page'" />
        </div>

        <q-separator vertical inset />
        <o-menubar-btn icon="undo" @click.native="commands.undo" />
        <o-menubar-btn icon="redo" @click.native="commands.redo" />
      </div>

      <div class="q-px-md right-actions" v-if="false">
        <o-menubar-btn icon="mdi-page-layout-sidebar-right" color="white" @click.native="showSidePanel(true)" flat />
        <o-menubar-btn :icon="isSlideShow ? `mdi-pause-circle-outline` : `mdi-play-box-outline`" :tooltip="$t('presentation')" @click.native="onSlideShow" />
        <o-menubar-btn :icon="$q.fullscreen.isActive ? `fullscreen_exit` : `fullscreen`" :tooltip="$t('action.fullscreen')" @click.native="$q.fullscreen.toggle()" />
      </div>
    </section>
  </editor-menu-bar>
</template>

<script>
import { EditorMenuBar } from 'tiptap'

import OForeColorDropdown from 'src/lib/components/buttons/OForeColorDropdown'
import OBackColorDropdown from 'src/lib/components/buttons/OBackColorDropdown'
import OAlignDropdown from 'src/lib/components/buttons/OAlignDropdown'
import OAlignGroup from 'src/lib/components/buttons/OAlignGroup'
import OHeadingDropdown from 'src/lib/components/buttons/OHeadingDropdown'
import OHeadingGroup from 'src/lib/components/buttons/OHeadingGroup'
import OHeadingList from 'src/lib/components/buttons/OHeadingList'

import OMenubarBtn from 'src/lib/components/buttons/OMenubarBtn'
import OCommonItem from 'src/lib/components/common/OCommonItem'
import OMetaInput from 'src/lib/components/common/OMetaInput'

export default {
  name: 'page-quasar-tiptap-all',
  data () {
    return {
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
    }
  },
  components: {
    EditorMenuBar,
    OMenubarBtn,
    OCommonItem,
    OMetaInput,
    OForeColorDropdown,
    OBackColorDropdown,
    OAlignDropdown,
    OAlignGroup,
    OHeadingDropdown,
    OHeadingGroup,
    OHeadingList
  },
  methods: {
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
