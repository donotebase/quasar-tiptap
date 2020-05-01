<template>
  <div>
    <q-btn-dropdown icon="format_align_center" menu-anchor="bottom left" menu-self="top left" class="o-align-dropdown" content-class="o-menu o-align-dropdown-menu" dense flat>
      <q-list>
        <q-item v-for="(item, index) in alignments" :key="index"
                :class="{ 'is-active': isActive(item.value) }"
                @click.native="item.command({ textAlign: item.value })" clickable v-close-popup>
          <q-item-section side>
            <q-icon :name="`format_align_${item.value}`" />
          </q-item-section>
          <q-item-section>{{item.label}}</q-item-section>
          <q-item-section side>
            <q-icon name="mdi-check" class="checked" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-tooltip :delay="500">{{$o.lang.editor.align}}</q-tooltip>
  </div>
</template>

<script>
import { isNodeActive } from 'src/utils/node'
export default {
  name: 'o-align-dropdown',
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
    isActive (alignment) {
      return isNodeActive(this.editor.state, 'textAlign', alignment)
    }
  },
  computed: {
    alignments () {
      return [
        { label: this.$o.lang.editor.left, value: 'left', command: this.commands.alignment },
        { label: this.$o.lang.editor.center, value: 'center', command: this.commands.alignment },
        { label: this.$o.lang.editor.right, value: 'right', command: this.commands.alignment },
        { label: this.$o.lang.editor.justify, value: 'justify', command: this.commands.alignment },
      ]
    }
  }
}
</script>

<style lang="stylus">
  .o-align-dropdown {
    padding 4px

    .q-btn-dropdown__arrow {
      margin-left 0
    }
  }
</style>
