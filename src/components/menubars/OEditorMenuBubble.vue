<template>
  <editor-menu-bubble :editor="editor" v-slot="editorContext">
    <section class="tiptap-menububble"
             :class="{ 'is-active': editorContext.menu.isActive && selectedCellSize === 0 }"
             :style="`left: ${editorContext.menu.left}px; bottom: ${editorContext.menu.bottom}px;`">
      <template v-for="(item, index) of bubbleToolbar">
        <q-separator vertical inset :key="index" v-if="item==='separator'" />
        <component :key="index"
                   :name="item"
                   :is="getName(item)"
                   :editor="editor"
                   v-bind="editorContext"
                   v-else-if="typeof item === 'string'" />
        <component :key="index"
                   :is="item"
                   :editor="editor"
                   v-bind="editorContext"
                   v-else />
      </template>
    </section>
  </editor-menu-bubble>
</template>

<script>
import { EditorMenuBubble } from 'tiptap'
import { CommandComponents, BubbleToolbar } from '../../utils/menu'

import OForeColorDropdown from '../buttons/OForeColorDropdown'
import OBackColorDropdown from '../buttons/OBackColorDropdown'
import OFontFamilyDropdown from '../buttons/OFontFamilyDropdown'
import OAlignDropdown from '../buttons/OAlignDropdown'
import OAlignGroup from '../buttons/OAlignGroup'
import OLineHeightDropdown from '../buttons/OLineHeightDropdown'
import OHeadingDropdown from '../buttons/OHeadingDropdown'
import OHeadingGroup from '../buttons/OHeadingGroup'
import OHeadingList from '../buttons/OHeadingList'

import OAddMoreBtn from '../buttons/OAddMoreBtn'
import OPhotoBtn from '../buttons/OPhotoBtn'
import OTableBtn from '../buttons/OTableBtn'
import OTableGroup from '../buttons/OTableGroup'

import OMenubarBtn from '../buttons/OMenubarBtn'
import OSimpleCommandBtn from '../buttons/OSimpleCommandBtn'
import OMetaInput from '../common/OMetaInput'

export default {
  name: 'page-quasar-tiptap-all',
  data () {
    return {
      bubbleToolbar: BubbleToolbar,
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
    },
    selectedCellSize: {
      type: Number,
      default: 0
    }
  },
  components: {
    EditorMenuBubble,
    OMenubarBtn,
    OSimpleCommandBtn,
    OMetaInput,
    OForeColorDropdown,
    OBackColorDropdown,
    OFontFamilyDropdown,
    OAlignDropdown,
    OAlignGroup,
    OLineHeightDropdown,
    OHeadingDropdown,
    OHeadingGroup,
    OHeadingList,
    OAddMoreBtn,
    OPhotoBtn,
    OTableBtn,
    OTableGroup
  },
  methods: {
    getName (item) {
      return CommandComponents[item] || 'o-simple-command-btn'
    },
  },
  mounted () {
  },
  deactivated () {
  },
  beforeDestroy () {
  }
}
</script>

<style lang="stylus">
</style>
