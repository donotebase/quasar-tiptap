<template>
  <div>
    <q-btn-dropdown :icon="currentItem.icon" menu-anchor="bottom left" menu-self="top left" :menu-offset="[20, 0]"
                    class="o-indent-dropdown" content-class="o-menu" @click="selectCurrent" split flat>
      <q-list class="">
        <q-item v-for="(item, index) in list" :key="index"
                :class="{ 'is-active': item.isActive }"
                @click.native="select(item)" clickable v-close-popup>
          <q-item-section side>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>{{item.label}}</q-item-section>
          <q-item-section side>
            <q-icon name="mdi-check" class="checked" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-tooltip :delay="500">{{$o.lang.editor.indentDropdown}}</q-tooltip>
  </div>
</template>

<script>
export default {
  name: 'o-indent-dropdown',
  data () {
    return {
      current: 'indent'
    }
  },
  props: {
    editor: {
      type: Object
    },
    commands: {
      type: Object
    },
    isActive: {
      type: Object
    },
  },
  components: {
  },
  methods: {
    selectCurrent () {
      this.select(this.currentItem)
    },
    select (item) {
      this.current = item.value
      item.command()
    }
  },
  computed: {
    list () {
      return [
        { label: this.$o.lang.editor.indent, value: 'indent', icon: 'format_indent_increase', isActive: false, command: this.commands.indent },
        { label: this.$o.lang.editor.outdent, value: 'outdent', icon: 'format_indent_decrease', isActive: false, command: this.commands.outdent },
      ]
    },
    currentItem () {
      for (let item of this.list) {
        if (this.current === item.value) {
          return item
        }
      }
      return { label: this.$o.lang.editor.indent, value: 'indent', icon: 'format_indent_increase', isActive: false, command: this.commands.indent }
    }
  }
}
</script>

<style lang="stylus">
  .o-indent-dropdown {
    .q-btn-dropdown__arrow {
      margin-left 0
    }

    .q-btn:first-child {
      padding 0 2px 0 4px
    }
    .q-btn:last-child {
      padding 0 0px 0 2px
    }
    .q-btn-dropdown__arrow-container {
      border none
    }
  }
</style>
