<template>
  <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, getMarkAttrs, focused }">
    <section class="row col-12 justify-between items-center bg-light tiptap-menubar">

      <!-- Table -->
      <div class="row q-px-xs menubar is-hidden" :class="{ 'is-focused': focused }" v-if="isActive.table()">
        <template v-for="(item, index) of tableToolbar">
          <o-simple-command-btn :name="item" :commands="commands" :is-active="isActive" :key="index" v-if="isSimpleCommand(item)" />
          <q-separator vertical inset :key="index" v-else-if="item==='separator'" />
          <o-table-group :commands="commands" :is-active="isActive" :key="index" v-else-if="item==='table'" />

          <o-fore-color-dropdown :commands="commands" :get-mark-attrs="getMarkAttrs" :key="index" v-else-if="item==='fore-color'" />
          <o-back-color-dropdown :commands="commands" :key="index" v-else-if="item==='back-color'" />
          <o-font-family-dropdown :commands="commands" :key="index" v-else-if="item==='font-family'" />
          <o-align-dropdown :commands="commands" :key="index" v-else-if="item==='align-dropdown'" />
        </template>
      </div>

      <!-- Normal -->
      <div class="row q-px-xs menubar is-hidden" :class="{ 'is-focused': focused }" v-else>
        <template v-for="(item, index) of toolbar">
          <o-simple-command-btn :name="item" :commands="commands" :is-active="isActive" :key="index" v-if="isSimpleCommand(item)" />
          <q-separator vertical inset :key="index" v-else-if="item==='separator'" />
          <o-fore-color-dropdown :commands="commands" :get-mark-attrs="getMarkAttrs" :key="index" v-else-if="item==='fore-color'" />
          <o-back-color-dropdown :commands="commands" :key="index" v-else-if="item==='back-color'" />
          <o-font-family-dropdown :commands="commands" :key="index" v-else-if="item==='font-family'" />
          <o-align-dropdown :commands="commands" :is-active="isActive" :key="index" v-else-if="item==='align-dropdown'" />
          <o-align-group :commands="commands" :is-active="isActive" :key="index" v-else-if="item==='align-group' && false" />
          <o-line-height-dropdown :commands="commands" :is-active="isActive" :key="index" v-else-if="item==='line-height'" />
          <o-heading-dropdown :commands="commands" :is-active="isActive" :key="index" v-else-if="item==='heading'" />
          <o-photo-btn :commands="commands" :is-active="isActive" :key="index" v-else-if="item==='photo'" />
          <o-add-more-btn :commands="commands" :is-active="isActive" :key="index" v-else-if="item==='add-more'" />
          <o-table-btn :commands="commands" :is-active="isActive" :key="index" v-else-if="item==='table'" />
        </template>
      </div>
    </section>
  </editor-menu-bar>
</template>

<script>
import { EditorMenuBar } from 'tiptap'

import OForeColorDropdown from 'src/components/buttons/OForeColorDropdown'
import OBackColorDropdown from 'src/components/buttons/OBackColorDropdown'
import OFontFamilyDropdown from 'src/components/buttons/OFontFamilyDropdown'
import OAlignDropdown from 'src/components/buttons/OAlignDropdown'
import OAlignGroup from 'src/components/buttons/OAlignGroup'
import OLineHeightDropdown from 'src/components/buttons/OLineHeightDropdown'
import OHeadingDropdown from 'src/components/buttons/OHeadingDropdown'
import OHeadingGroup from 'src/components/buttons/OHeadingGroup'
import OHeadingList from 'src/components/buttons/OHeadingList'

import OAddMoreBtn from 'src/components/buttons/OAddMoreBtn'
import OPhotoBtn from 'src/components/buttons/OPhotoBtn'
import OTableBtn from 'src/components/buttons/OTableBtn'
import OTableGroup from 'src/components/buttons/OTableGroup'

import OMenubarBtn from 'src/components/buttons/OMenubarBtn'
import OSimpleCommandBtn from 'src/components/buttons/OSimpleCommandBtn'
import OMetaInput from 'src/components/common/OMetaInput'

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
        'undo',
        'redo',
        'indent',
        'outdent',
        'format_clear',
      ],
      tableToolbar: [
        'bold',
        'italic',
        'strike',
        'underline',
        'separator',
        'font-family',
        'fore-color',
        'back-color',
        'separator',
        'align-dropdown',
        'separator',
        'table'
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
    isSimpleCommand (item) {
      return this.simpleCommands.indexOf(item) >= 0
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
