<template>
  <div>
    <q-btn-dropdown icon="title" menu-anchor="bottom left" menu-self="top left" :menu-offset="[0, 0]"
                    class="o-text-format-dropdown" content-class="o-menu" flat>
      <q-list>
        <q-item v-for="(item, index) in customList" :key="index"
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
    <q-tooltip :delay="500">{{$o.lang.editor.textFormat}}</q-tooltip>
  </div>
</template>

<script>
export default {
  name: 'o-text-format-dropdown',
  data () {
    return {
      current: ''
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
    opt: {
      type: Object,
      default: function () {
        return {}
      }
    },
  },
  components: {
  },
  methods: {
    selectCurrent () {
      this.select(this.currentItem)
    },
    select (item) {
      if (item) {
        this.current = item.value
        item.command()
      }
    }
  },
  computed: {
    list () {
      return [
        { label: this.$o.lang.editor.bold, value: 'bold', icon: 'format_bold', isActive: this.isActive.bold(), command: this.commands.bold },
        { label: this.$o.lang.editor.italic, value: 'italic', icon: 'format_italic', isActive: this.isActive.italic(), command: this.commands.italic },
        { label: this.$o.lang.editor.strikethrough, value: 'strike', icon: 'format_strikethrough', isActive: this.isActive.strike(), command: this.commands.strike },
        { label: this.$o.lang.editor.underline, value: 'underline', icon: 'format_underline', isActive: this.isActive.underline(), command: this.commands.underline },
        { label: this.$o.lang.editor.code, value: 'code', icon: 'code', isActive: this.isActive.code(), command: this.commands.code },
      ]
    },
    customList () {
      if (this.opt && this.opt.list) {
        let list = []
        for (let name of this.opt.list) {
          for (let item of this.list) {
            if (name === item.value) {
              list.push(item)
            }
          }
        }

        return list
      } else {
        return this.list
      }
    },
    currentItem () {
      for (let item of this.list) {
        if (this.current === item.value) {
          return item
        }
      }
      return null
    }
  }
}
</script>

<style lang="stylus">
  .o-text-format-dropdown {
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
