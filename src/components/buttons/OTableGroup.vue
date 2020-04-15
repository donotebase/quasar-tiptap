<template>
  <section class="row o-table-group">
    <o-menubar-btn icon="mdi-table-remove" tooltip="Remove Table" @click.native="commands.deleteTable" />

    <q-separator />
    <o-menubar-btn icon="mdi-table-column-plus-before" @click.native="commands.addColumnBefore" />
    <o-menubar-btn icon="mdi-table-column-plus-after" @click.native="commands.addColumnAfter" />
    <o-menubar-btn icon="mdi-table-column-remove" @click.native="commands.deleteColumn" />

    <q-separator />
    <o-menubar-btn icon="mdi-table-row-plus-before" @click.native="commands.addRowBefore" />
    <o-menubar-btn icon="mdi-table-row-plus-after" @click.native="commands.addRowAfter" />
    <o-menubar-btn icon="mdi-table-row-remove" @click.native="commands.deleteRow" />

    <q-separator />
    <o-menubar-btn icon="mdi-table-merge-cells" @click.native="commands.toggleCellMerge" />
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
