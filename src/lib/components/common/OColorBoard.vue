<template>
  <section class="o-color-board">
    <div class="row color-row" v-for="(row, i) in colorSet" :key="`row-${i}`">
      <div class="row color-column" v-for="(col, j) in row" :key="`col-${j}`">
        <div class="row justify-center items-center cell-container" @click="onSelect(col.value)">
          <div class="cell" :class="{ 'border': col.border }" :style="{ backgroundColor: col.value }"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'o-color-board',
  data () {
    return {
    }
  },
  props: {
    closable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onSelect (color) {
      this.$emit('select', color)
    }
  },
  computed: {
    colorSet () {
      return [
        [
          { label: 'color', value: 'rgb(0, 0, 0)' },
          { label: 'color', value: 'rgb(38, 38, 38)' },
          { label: 'color', value: 'rgb(89, 89, 89)' },
          { label: 'color', value: 'rgb(140, 140, 140)' },
          { label: 'color', value: 'rgb(191, 191, 191)' },
          { label: 'color', value: 'rgb(217, 217, 217)' },
          { label: 'color', value: 'rgb(233, 233, 233)' },
          { label: 'color', value: 'rgb(245, 245, 245)' },
          { label: 'color', value: 'rgb(250, 250, 250)', border: true },
          { label: 'color', value: 'rgb(255, 255, 255)', border: true },
        ],
        [
          { label: 'color', value: 'rgb(245, 34, 45)' },
          { label: 'color', value: 'rgb(250, 84, 28)' },
          { label: 'color', value: 'rgb(250, 140, 22)' },
          { label: 'color', value: 'rgb(250, 219, 20)' },
          { label: 'color', value: 'rgb(82, 196, 26)' },
          { label: 'color', value: 'rgb(19, 194, 194)' },
          { label: 'color', value: 'rgb(24, 144, 255)' },
          { label: 'color', value: 'rgb(47, 84, 235)' },
          { label: 'color', value: 'rgb(114, 46, 209)' },
          { label: 'color', value: 'rgb(235, 47, 150)' },
        ],
        [
          { label: 'color', value: 'rgb(255, 232, 230)' },
          { label: 'color', value: 'rgb(255, 236, 224)' },
          { label: 'color', value: 'rgb(255, 239, 209)' },
          { label: 'color', value: 'rgb(255, 248, 189)' },
          { label: 'color', value: 'rgb(228, 247, 210)' },
          { label: 'color', value: 'rgb(211, 245, 240)' },
          { label: 'color', value: 'rgb(212, 238, 252)' },
          { label: 'color', value: 'rgb(222, 232, 252)' },
          { label: 'color', value: 'rgb(239, 225, 250)' },
          { label: 'color', value: 'rgb(250, 225, 235)' },
        ],
        [
          { label: 'color', value: 'rgb(255, 163, 158)' },
          { label: 'color', value: 'rgb(255, 187, 150)' },
          { label: 'color', value: 'rgb(255, 213, 145)' },
          { label: 'color', value: 'rgb(255, 240, 143)' },
          { label: 'color', value: 'rgb(183, 235, 143)' },
          { label: 'color', value: 'rgb(135, 232, 222)' },
          { label: 'color', value: 'rgb(145, 213, 255)' },
          { label: 'color', value: 'rgb(173, 198, 255)' },
          { label: 'color', value: 'rgb(211, 173, 247)' },
          { label: 'color', value: 'rgb(255, 173, 210)' },
        ],
        [
          { label: 'color', value: 'rgb(255, 77, 79)' },
          { label: 'color', value: 'rgb(255, 122, 69)' },
          { label: 'color', value: 'rgb(255, 169, 64)' },
          { label: 'color', value: 'rgb(255, 236, 61)' },
          { label: 'color', value: 'rgb(115, 209, 61)' },
          { label: 'color', value: 'rgb(54, 207, 201)' },
          { label: 'color', value: 'rgb(64, 169, 255)' },
          { label: 'color', value: 'rgb(89, 126, 247)' },
          { label: 'color', value: 'rgb(146, 84, 222)' },
          { label: 'color', value: 'rgb(247, 89, 171)' },
        ],
        [
          { label: 'color', value: 'rgb(207, 19, 34)' },
          { label: 'color', value: 'rgb(212, 56, 13)' },
          { label: 'color', value: 'rgb(212, 107, 8)' },
          { label: 'color', value: 'rgb(212, 177, 6)' },
          { label: 'color', value: 'rgb(56, 158, 13)' },
          { label: 'color', value: 'rgb(8, 151, 156)' },
          { label: 'color', value: 'rgb(9, 109, 217)' },
          { label: 'color', value: 'rgb(29, 57, 196)' },
          { label: 'color', value: 'rgb(83, 29, 171)' },
          { label: 'color', value: 'rgb(196, 29, 127)' },
        ],
        [
          { label: 'color', value: 'rgb(130, 0, 20)' },
          { label: 'color', value: 'rgb(135, 20, 0)' },
          { label: 'color', value: 'rgb(135, 56, 0)' },
          { label: 'color', value: 'rgb(97, 71, 0)' },
          { label: 'color', value: 'rgb(19, 82, 0)' },
          { label: 'color', value: 'rgb(0, 71, 79)' },
          { label: 'color', value: 'rgb(0, 58, 140)' },
          { label: 'color', value: 'rgb(6, 17, 120)' },
          { label: 'color', value: 'rgb(34, 7, 94)' },
          { label: 'color', value: 'rgb(120, 6, 80)' },
        ],
      ]
    }
  }
}
</script>

<style lang="stylus">
  .o-color-board {
    padding 10px

    .color-row:nth-child(2) {
      margin 12px 0 8px 0
    }

    .cell-container {
      width 24px
      height 24px
      margin 1px
      border-radius 2px
      border solid 1px transparent
      cursor pointer
      box-sizing border-box

      .cell {
        width 20px
        height 20px
        border-radius 2px
      }

      .cell.border {
        border solid 1px rgba(0,0,0,0.05)
      }
    }

    .cell-container:hover {
      box-shadow 0px 0px 5px 0px rgba(0,0,0,.2)
      border solid 1px rgba(0,0,0,.2)
    }
  }
</style>
