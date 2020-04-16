<template>
  <section class="row o-table-group">
    <o-menubar-btn icon="mdi-table-remove"
                   :tooltip="$o.lang.table.remove"
                   @click.native="commands.deleteTable" />

    <q-separator vertical />
    <o-menubar-btn icon="mdi-table-column-plus-before"
                   :tooltip="$o.lang.table.insertColumnLeft"
                   @click.native="commands.addColumnBefore" />
    <o-menubar-btn icon="mdi-table-column-plus-after"
                   :tooltip="$o.lang.table.insertColumnRight"
                   @click.native="commands.addColumnAfter" />
    <o-menubar-btn icon="mdi-table-column-remove"
                   :tooltip="$o.lang.table.removeColumns"
                   @click.native="commands.deleteColumn" />

    <q-separator vertical />
    <o-menubar-btn icon="mdi-table-row-plus-before"
                   :tooltip="$o.lang.table.insertRowUp"
                   @click.native="commands.addRowBefore" />
    <o-menubar-btn icon="mdi-table-row-plus-after"
                   :tooltip="$o.lang.table.insertRowDown"
                   @click.native="commands.addRowAfter" />
    <o-menubar-btn icon="mdi-table-row-remove"
                   :tooltip="$o.lang.table.removeRows"
                   @click.native="commands.deleteRow" />

    <q-separator vertical />
    <o-menubar-btn icon="mdi-table-merge-cells"
                   :tooltip="$o.lang.table.merge"
                   @click.native="commands.toggleCellMerge" />
  </section>
</template>

<script>
import OMenubarBtn from 'src/components/buttons/OMenubarBtn'
export default {
  name: 'o-table-group',
  data () {
    return {
    }
  },
  props: {
    commands: {
      type: Object
    },
    isActive: {
      type: Object
    }
  },
  components: {
    OMenubarBtn
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style lang="stylus">
  .o-table-group {
    height 40px
  }
</style>
