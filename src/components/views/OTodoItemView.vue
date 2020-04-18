<template>
  <li
    :data-type="node.type.name"
    :data-done="done.toString()"
    :data-text-align="node.attrs.textAlign"
    :class="{ 'todo-item--done': done }"
    class="o-todo-item"
    data-drag-handle
  >
    <div
      contenteditable="false"
      class="row col-12 items-center todo-checkbox"
      @click.stop="toggle"
    >
      <q-icon :name="done ? 'check_box' : 'check_box_outline_blank'" />
    </div>

    <div
      ref="content"
      :contenteditable="view.editable.toString()"
      class="full-width todo-content"
    />
  </li>
</template>

<script>
export default {
  name: 'o-todo-item',
  data () {
    return {
    }
  },
  props: ['node', 'updateAttrs', 'view'],
  components: {
  },
  methods: {
    toggle () {
      this.done = !this.done
    }
  },
  computed: {
    done: {
      get () {
        return this.node.attrs.done
      },
      set (done) {
        this.updateAttrs({
          done
        })
      }
    }
  }
}
</script>

<style lang="stylus">
  .o-todo-item {
  }
</style>
