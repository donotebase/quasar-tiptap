<template>
  <editor-menu-bar :editor="editor" v-slot="editorContext">
    <section class="row col-12 justify-between items-center bg-light tiptap-menubar">

      <!-- Table -->
      <div class="row q-px-xs menubar is-hidden" :class="{ 'is-focused': editorContext.focused }" v-if="editorContext.isActive.table()">
        <template v-for="(item, index) of tableToolbar">
          <q-separator vertical inset :key="index" v-if="item==='separator'" />
          <component :key="index"
                     :name="item"
                     :is="getName(item)"
                     :editor="editor"
                     v-bind="editorContext"
                     v-else>
          </component>
          <o-table-group v-bind="editorContext" :key="`table-${index}`" v-if="item==='table'" />
        </template>
      </div>

      <!-- Normal -->
      <div class="row q-px-xs menubar is-hidden" :class="{ 'is-focused': editorContext.focused }" v-else>
        <template v-for="(item, index) of toolbar">
          <q-separator vertical inset :key="index" v-if="item==='separator'" />
          <component :key="index"
                     :name="item"
                     :is="getName(item)"
                     :editor="editor"
                     v-bind="editorContext"
                     v-else>
          </component>
        </template>
      </div>
    </section>
  </editor-menu-bar>
</template>

<script>
import { EditorMenuBar } from 'tiptap'
import { CommandComponents, TableToolbar } from '../../utils/menu'

import OForeColorDropdown from 'src/lib/components/buttons/OForeColorDropdown'
import OBackColorDropdown from 'src/lib/components/buttons/OBackColorDropdown'
import OFontFamilyDropdown from 'src/lib/components/buttons/OFontFamilyDropdown'
import OAlignDropdown from 'src/lib/components/buttons/OAlignDropdown'
import OAlignGroup from 'src/lib/components/buttons/OAlignGroup'
import OLineHeightDropdown from 'src/lib/components/buttons/OLineHeightDropdown'
import OHeadingDropdown from 'src/lib/components/buttons/OHeadingDropdown'
import OHeadingGroup from 'src/lib/components/buttons/OHeadingGroup'
import OHeadingList from 'src/lib/components/buttons/OHeadingList'

import OAddMoreBtn from 'src/lib/components/buttons/OAddMoreBtn'
import OPhotoBtn from 'src/lib/components/buttons/OPhotoBtn'
import OTableBtn from 'src/lib/components/buttons/OTableBtn'
import OTableGroup from 'src/lib/components/buttons/OTableGroup'

import OMenubarBtn from 'src/lib/components/buttons/OMenubarBtn'
import OSimpleCommandBtn from 'src/lib/components/buttons/OSimpleCommandBtn'
import OMetaInput from 'src/lib/components/common/OMetaInput'

export default {
  name: 'page-quasar-tiptap-all',
  data () {
    return {
      tableToolbar: TableToolbar,
      pageView: 'page',
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
    getName (item) {
      return CommandComponents[item] || 'o-simple-command-btn'
    },
    showSidePanel () {},
    onSlideShow () {}
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
