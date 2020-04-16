<template>
  <q-list class="o-heading-list">
    <q-item clickable v-close-popup @click.native="commands.paragraph">
      <q-item-section side><q-icon name="mdi-format-pilcrow" /></q-item-section>
      <q-item-section>{{$o.lang.editor.paragraph}}</q-item-section>
    </q-item>
    <q-separator />
    <q-item v-for="(item, index) in headings" :key="index"
            :class="{ 'is-active': isActive(item.value) }"
            @click.native="commands.heading({ level: item.value })" clickable v-close-popup>
      <q-item-section side>{{`H${item.value}`}}</q-item-section>
      <q-item-section>{{item.label}}</q-item-section>
      <q-item-section side>
        <q-icon name="mdi-check" class="checked" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { isNodeActive } from 'src/utils/node'
export default {
  name: 'o-heading-list',
  data () {
    return {
    }
  },
  props: {
    editor: {
      type: Object
    },
    commands: {
      type: Object
    }
  },
  methods: {
    isActive (level) {
      return isNodeActive(this.editor.state, 'level', level)
    }
  },
  computed: {
    headings () {
      return [
        { label: this.$o.lang.editor.heading1, value: 1 },
        { label: this.$o.lang.editor.heading2, value: 2 },
        { label: this.$o.lang.editor.heading3, value: 3 },
        { label: this.$o.lang.editor.heading4, value: 4 },
        { label: this.$o.lang.editor.heading5, value: 5 },
      ]
    }
  }
}
</script>

<style lang="stylus">
  .o-heading-list {
  }
</style>
