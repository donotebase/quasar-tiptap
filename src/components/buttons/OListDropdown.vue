<template>
  <div>
    <q-btn-dropdown :icon="currentItem.icon" menu-anchor="bottom left" menu-self="top left" :menu-offset="[20, 0]"
                    class="o-list-dropdown" content-class="o-menu" @click="selectCurrent" split flat>
      <q-list class="o-heading-list">
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
    <q-tooltip>{{$o.lang.editor.list}}</q-tooltip>
  </div>
</template>

<script>
export default {
  name: 'o-list-dropdown',
  data () {
    return {
      current: 'bullet_list'
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
        { label: this.$o.lang.editor.unorderedList, value: 'bullet_list', icon: 'format_list_bulleted', isActive: this.isActive.bullet_list(), command: this.commands.bullet_list },
        { label: this.$o.lang.editor.orderedList, value: 'ordered_list', icon: 'format_list_numbered', isActive: this.isActive.ordered_list(), command: this.commands.ordered_list },
        { label: this.$o.lang.editor.todoList, value: 'todo_list', icon: 'mdi-check-box-outline', isActive: this.isActive.todo_list(), command: this.commands.todo_list },
      ]
    },
    currentItem () {
      for (let item of this.list) {
        if (this.current === item.value) {
          return item
        }
      }
      return { label: this.$o.lang.editor.unorderedList, value: 'bullet_list', icon: 'format_list_bulleted', isActive: this.isActive.bullet_list(), command: this.commands.bullet_list }
    }
  }
}
</script>

<style lang="stylus">
  .o-list-dropdown {
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
