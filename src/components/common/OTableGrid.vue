<template>
  <section class="o-table-grid">
    <div class="row justify-start cursor-pointer" v-for="(row, i) in rows" :key="`row-${i}`">
      <div v-for="(col, j) in columns" :key="`col-${j}`">
        <div class="cell" :class="{'selected': row <= selectedRows && col <= selectedColumns}"
             @mouseover="select(row, col)"
             @click="onSelected()" v-close-popup></div>
      </div>
    </div>

    <footer class="row justify-center q-pt-md">
      {{selectedRows}} x {{selectedColumns}}
    </footer>
  </section>
</template>

<script>
export default {
  name: 'o-table-grid',
  data () {
    return {
      rows: 5,
      columns: 5,
      selectedRows: 2,
      selectedColumns: 2
    }
  },
  props: {
    commands: {
      type: Object
    },
  },
  methods: {
    onHide () {
      this.rows = 5
      this.columns = 5
      this.selectedRows = 2
      this.selectedColumns = 2
    },
    select (row, col) {
      this.selectedRows = row
      this.selectedColumns = col

      if (this.rows === row && this.rows < 10) {
        this.rows += 1
      }
      if (this.columns === col && this.columns < 10) {
        this.columns += 1
      }
    },
    onSelected () {
      this.commands.createTable({ rowsCount: this.selectedRows, colsCount: this.selectedColumns, withHeaderRow: true })
    }
  },
  computed: {
  }
}
</script>

<style lang="stylus">
  .o-table-grid {
    padding 1rem

    .cell {
      height 20px
      width 20px
      margin 4px
      border solid 1px #ccc
      border-radius 2px
    }

    .cell.selected {
      border solid 1px #1976D2
      background rgba(#1976D2, 0.2)
    }
  }
</style>
