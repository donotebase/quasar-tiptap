<template>
  <q-btn-dropdown icon="mdi-format-font" menu-anchor="bottom left" menu-self="top left" class="o-font-family" content-class="o-menu o-align-dropdown-menu" dense flat>
    <q-list>
      <template v-for="(item, index) of fontFamilies">
        <q-separator :key="index" v-if="item.separator" />
        <q-item :key="index" clickable v-close-popup
                @click.native="commands.fontFamily({fontFamily: item.value})" v-else>
          <q-item-section :style="`font-family: ${item.label}`">{{item.label}}</q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
export default {
  name: 'o-font-family',
  data () {
    return {
      fontFamilies: [
        { label: 'Default', value: 'Roboto' },
        { label: 'Arial', value: 'Arial', separator: true },
        { label: 'Arial Black', value: 'Arial Black' },
        { label: 'Georgia', value: 'Georgia' },
        { label: 'Impact', value: 'Impact' },
        { label: 'Helvetica', value: 'Helvetica' },
        { label: 'Roboto', value: 'Roboto' },
        { label: 'Tahoma', value: 'Tahoma' },
        { label: 'Times New Roman', value: 'Times New Roman' },
        { label: 'Verdana', value: 'Verdana' },
        { label: 'Courier New', value: 'Courier New', separator: true },
        { label: 'Monaco', value: 'Monaco' },
        { label: 'Monospace', value: 'monospace' },
      ]
    }
  },
  props: {
    commands: {
      type: Object
    }
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style lang="stylus">
  .o-font-family {
    padding 4px

    .q-btn-dropdown__arrow {
      margin-left 0
    }
  }

  .o-align-dropdown-menu {
    .q-list {
      .q-icon {
        font-size 1rem
      }
    }
  }
</style>
