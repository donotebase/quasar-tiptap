<template>
  <q-list class="o-heading-list">
    <q-item clickable v-close-popup @click.native="commands.paragraph">
      <q-item-section side><q-icon name="mdi-format-pilcrow" /></q-item-section>
      <q-item-section>正文</q-item-section>
    </q-item>
    <q-separator />
    <q-item :class="{ 'is-active': isActive(1) }" clickable v-close-popup @click.native="commands.heading({ level: 1 })">
      <q-item-section side>H1</q-item-section>
      <q-item-section>H1 标题</q-item-section>
    </q-item>
    <q-item :class="{ 'is-active': isActive(2) }" clickable v-close-popup @click.native="commands.heading({ level: 2 })">
      <q-item-section side>H2</q-item-section>
      <q-item-section>H2 标题</q-item-section>
    </q-item>
    <q-item :class="{ 'is-active': isActive(3) }" clickable v-close-popup @click.native="commands.heading({ level: 3 })">
      <q-item-section side>H3</q-item-section>
      <q-item-section>H3 标题</q-item-section>
    </q-item>
    <q-item :class="{ 'is-active': isActive(4) }" clickable v-close-popup @click.native="commands.heading({ level: 4 })">
      <q-item-section side>H4</q-item-section>
      <q-item-section>H4 标题</q-item-section>
    </q-item>
    <q-item :class="{ 'is-active': isActive(5) }" clickable v-close-popup @click.native="commands.heading({ level: 5 })">
      <q-item-section side>H5</q-item-section>
      <q-item-section>H5 标题</q-item-section>
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
  }
}
</script>

<style lang="stylus">
  .o-heading-list {
  }
</style>
