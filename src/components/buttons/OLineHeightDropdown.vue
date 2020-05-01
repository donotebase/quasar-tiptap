<template>
  <div>
    <q-btn-dropdown icon="mdi-format-line-spacing" menu-anchor="bottom left" menu-self="top left" class="o-line-height-dropdown" content-class="o-menu o-line-height-dropdown-menu" dense flat>
      <q-list>
        <template v-for="(item, index) of types">
          <q-separator :key="`s-${index}`" v-if="item.separator" />
          <q-item :class="{ 'is-active': isActive(item.value) }" :key="index" clickable v-close-popup
                  @click.native="commands.lineHeight({lineHeight: item.value})">
            <q-item-section>{{item.label}}</q-item-section>
            <q-item-section side>
              <q-icon name="mdi-check" class="checked" />
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-btn-dropdown>
    <q-tooltip :delay="500">{{$o.lang.editor.lineHeight}}</q-tooltip>
  </div>
</template>

<script>
import { isNodeActive } from 'src/utils/node'
export default {
  name: 'o-line-height-dropdown',
  data () {
    return {
      types: [
        { label: this.$o.lang.editor.default, value: '0' },
        { label: '1', value: '1', separator: true },
        { label: '1.15', value: '1.15' },
        { label: '1.5', value: '1.5' },
        { label: '2', value: '2' },
        { label: '2.5', value: '2.5' },
        { label: '3', value: '3' },
      ]
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
    isActive (lineHeight) {
      return isNodeActive(this.editor.state, 'lineHeight', lineHeight)
    }
  },
  computed: {
  }
}
</script>

<style lang="stylus">
  .o-line-height-dropdown {
    padding 4px

    .q-btn-dropdown__arrow {
      margin-left 0
    }
  }

  .o-line-height-dropdown-menu {
    .q-list {
      .q-icon {
        font-size 1rem
      }
    }
  }
</style>
