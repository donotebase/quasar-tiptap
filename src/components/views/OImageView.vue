<template>
  <span class="o-image-view" :class="{ 'full-screen': fullScreen }">
    <!-- image, use span for print -->
    <span
      class="image-container"
      :data-text-align="node.attrs.textAlign"
      :class="{ 'selected': selected || resizing }"
    >
      <img
        :src="src"
        :width="node.attrs.width"
        :height="node.attrs.height"
        :caption="node.attrs.caption"
        :ref="node.attrs.ref"
        :class="{ 'selected': selected || resizing, 'cursor-pointer': node.attrs.ref }"
        @click="selectImage"
      />

      <div
        v-if="view.editable"
        v-show="selected || resizing"
        class="image-resizer"
      >
        <span
          v-for="(item, index) in resizeDirections"
          :key="index"
          :class="`image-resizer__handler--${item.value}`"
          class="image-resizer__handler"
          @mousedown="onMouseDown($event, item.value)"
        />
      </div>
    </span>
    <div class="text-center text-grey caption" v-if="node.attrs.caption">
      {{node.attrs.caption}}
    </div>

    <!-- toolbar -->
    <div class="row col-12 justify-end items-center o-toolbar">
      <div class="col-auto actions">
        <q-btn color="blue" icon="fullscreen" @click="toggleFullScreen" flat>
          <q-tooltip anchor="top middle" self="bottom middle">{{$o.lang.editor.toggleFullscreen}}</q-tooltip>
        </q-btn>
        <q-btn color="blue" icon="settings" flat v-if="view.editable">
          <q-tooltip anchor="top middle" self="bottom middle">{{$o.lang.image.preferences}}</q-tooltip>
          <q-menu ref="imgRef" anchor="top right" self="top left" content-class="o-menu o-image-menu">
            <section class="q-px-md q-pb-sm">
              <div class="row justify-between items-center text-bold q-py-sm">
                <div>{{$o.lang.image.preferences}}</div>
                <div><q-btn icon="close" size="0.7rem" flat dense @click="$refs.imgRef.hide()" /></div>
              </div>
              <q-separator />
              <div class="row col-12 items-start q-py-md">
                <q-input v-model="imgOption.width" type="number" debounce="500" standout
                         :hint="$o.lang.image.width" suffix="px"
                         @input="onInput($event, 'width')" />
                <div class="q-px-sm">
                  <q-btn :icon="keepRatio?'link':'link_off'"
                         @click="keepRatio = !keepRatio"
                         dense
                         flat>
                    <q-tooltip>{{keepRatio ? $o.lang.image.lockAspectRatio : $o.lang.image.unlockAspectRatio}}</q-tooltip>
                  </q-btn>
                </div>
                <q-input v-model="imgOption.height" type="number" debounce="500" standout
                         :hint="$o.lang.image.height" suffix="px"
                         @input="onInput($event, 'height')" />
              </div>
              <div class="row col-12 items-center q-py-sm">
                {{$o.lang.image.src}}
                <q-input v-model="imgOption.src" debounce="500" class="col-12" standout clearable
                         @input="onInput($event, 'src')" />
              </div>
              <div class="row col-12 items-center q-py-sm">
                {{$o.lang.image.caption}}
                <q-input v-model="imgOption.caption" debounce="500" class="col-12" standout clearable
                         @input="onInput($event, 'caption')" />
              </div>
              <div class="row col-12 items-center q-py-sm">
                {{$o.lang.image.link}}
                <q-input v-model="imgOption.ref" debounce="500" class="col-12" standout clearable
                         @input="onInput($event, 'ref')" />
              </div>
            </section>
          </q-menu>
        </q-btn>
      </div>
    </div>
  </span>
</template>

<script>
import { debounce } from 'quasar'
import { NodeSelection } from 'prosemirror-state'
import { resolveImg } from 'src/utils/image'
import { clamp } from 'src/utils/shared'
export default {
  name: 'o-image-view',
  data () {
    return {
      fullScreen: false,
      imgOption: {
        src: '',
        caption: '',
        ref: '',
        width: 0,
        height: 0,
        originalWidth: 0,
        originalHeight: 0,
      },
      keepRatio: true,
      resizing: false,
      resizerState: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        dir: '',
      },
      sizeRate: 1,
      maxWidth: 0,
    }
  },
  props: ['node', 'view', 'updateAttrs', 'getPos', 'selected'],
  components: {
  },
  methods: {
    getMaxSize () {
      const { width } = getComputedStyle(this.view.dom)
      this.maxWidth = parseInt(width, 10)
    },
    toggleFullScreen () {
      this.fullScreen = !this.fullScreen
    },
    selectImage () {
      if (!this.view.editable && this.node.attrs.ref) {
        window.open(this.node.attrs.ref, '_blank')
        return
      }

      const { state } = this.view
      let { tr } = state
      const selection = NodeSelection.create(state.doc, this.getPos())
      tr = tr.setSelection(selection)
      this.view.dispatch(tr)
    },
    resolveImage (refresh = false) {
      resolveImg(this.src).then(result => {
        if (!result.complete) {
          result.width = 20
          result.height = 20
        }
        this.imgOption = {
          src: this.src,
          caption: this.node.attrs.caption,
          ref: this.node.attrs.ref,
          width: refresh ? result.width : this.node.attrs.width || result.width,
          height: refresh ? result.height : this.node.attrs.height || result.height,
          originalWidth: result.width,
          originalHeight: result.height,
        }
        if (refresh) {
          this.resize(null, null)
        }
      }).catch(err => {
        console.warn('error', err)
        this.src = 'https://www.donote.info/statics/logo.png'
        this.resolveImage(true)
      })
    },
    onInput (value, name) {
      switch (name) {
        case 'src':
          this.src = value
          this.resolveImage(true)
          break
        case 'caption':
          this.updateAttrs({
            caption: value
          })
          break
        case 'ref':
          this.updateAttrs({
            ref: value
          })
          break
        case 'width':
          if (value < 20) {
            this.imgOption.width = 20
          }
          this.updateSize('width')
          break
        case 'height':
          if (value < 20) {
            this.imgOption.height = 20
          }
          this.updateSize('height')
          break
      }
    },
    updateSize (type) {
      const ratio = this.imgOption.originalWidth / this.imgOption.originalHeight
      let width = this.imgOption.width
      let height = this.imgOption.height

      if (type === 'width') {
        width = Math.min(width, this.maxWidth)
        height = parseInt(width / ratio, 10)
      } else {
        width = parseInt(height * ratio, 10)
        width = Math.min(width, this.maxWidth)
        height = parseInt(width / ratio, 10)
      }

      this.resize(width, height)
      this.imgOption.width = width
      this.imgOption.height = height
    },
    onMouseDown (e, direction) {
      e.preventDefault()
      e.stopPropagation()

      this.resizerState.x = e.clientX
      this.resizerState.y = e.clientY
      this.resizerState.w = Math.min(this.imgOption.width, this.maxWidth)
      this.resizerState.h = this.imgOption.height
      this.resizerState.direction = direction

      this.resizing = true
      this.onEvents()
    },
    onMouseMove (e) {
      e.preventDefault()
      e.stopPropagation()
      if (!this.resizing) {
        return
      }

      const ratio = this.imgOption.originalWidth / this.imgOption.originalHeight
      const { x, y, w, h, direction } = this.resizerState
      const dx = (e.clientX - x) * (/l/.test(direction) ? -1 : 1)
      const dy = (e.clientY - y) * (/t/.test(direction) ? -1 : 1)
      let width = clamp(w + dx, 20, 100000)
      let height = Math.max(h + dy, 20)

      if (this.keepRatio) {
        const newRatio = width / height
        if (newRatio > ratio) {
          width = parseInt(height * ratio, 10)
        } else if (newRatio < ratio) {
          height = parseInt(width / ratio, 10)
        }
      }

      this.resize(width, height)
      this.imgOption.width = width
      this.imgOption.height = height
    },
    resize (width, height) {
      this.updateAttrs({
        width: width,
        height: height,
      })
    },
    onMouseUp (e) {
      e.preventDefault()
      e.stopPropagation()

      if (!this.resizing) {
        return
      }

      this.resizing = false
      this.resizerState = {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        direction: '',
      }

      this.offEvents()
      this.selectImage()
    },
    onEvents () {
      document.addEventListener('mousemove', this.onMouseMove, true)
      document.addEventListener('mouseup', this.onMouseUp, true)
    },
    offEvents () {
      document.removeEventListener('mousemove', this.onMouseMove, true)
      document.removeEventListener('mouseup', this.onMouseUp, true)
    }
  },
  computed: {
    src: {
      get () {
        return this.node.attrs.src
      },
      set (src) {
        this.updateAttrs({
          src
        })
      }
    },
    sizeOptions () {
      return [
        { label: '25%', value: 0.25 },
        { label: '50%', value: 0.5 },
        { label: '75%', value: 0.75 },
        { label: '100%', value: 1 },
      ]
    },
    resizeDirections () {
      return [
        { label: '', value: 'tl' },
        { label: '', value: 'tr' },
        { label: '', value: 'bl' },
        { label: '', value: 'br' },
      ]
    }
  },
  created () {
    this.resolveImage()
  },
  mounted () {
    this.getMaxSize()
  }
}
</script>

<style lang="stylus">
  .o-image-view {
    position relative
    display inline-block

    .o-toolbar {
      position absolute
      top 0
      width 100%
      height 40px
      margin 0
      padding 0px
      background transparent
      border-radius 6px 6px 0 0
      visibility hidden
      z-index 10

      .actions {
        .q-btn {
          padding 0
          margin-left 4px
        }

        .q-btn__wrapper {
          padding 4px 8px
          min-height unset
        }
      }
    }

    &:hover {
      background rgba(0,0,0,0.02)
      .o-toolbar {
        visibility visible
      }
    }
    &.full-screen {
      position fixed
      top 0
      left 0
      right 0
      bottom 0
      background rgba(0,0,0,0.9)
      z-index 3000

      display flex
      justify-content center
      align-items center

      .o-toolbar {
        position absolute
        top 0
        margin 0
        visibility visible
        z-index 10
      }

      .image-container {
        img {
          width auto
          height auto
          max-width 100%
          max-height 100%
        }
      }
      .caption {
        display none
      }
    }

    .image-container {
      position relative
      display inline-block
      padding 0
      margin 0
      outline-style solid
      outline-width 1px
      outline-color transparent
      clear both
      box-sizing border-box

      img {
        display block
      }

      &:hover {
        // outline-style dashed
        // outline-color rgba(#1976D2, 0.3)
      }

      &.selected {
        outline-style solid
        outline-color #1976D2
      }

      .image-resizer {
        position: absolute;
        height: 100%;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 1;

        &__handler {
          background-color: #1976D2;
          border: 1px solid white;
          border-radius: 2px;
          box-sizing: border-box;
          display: block;
          height: 12px;
          position: absolute;
          width: 12px;
          z-index: 2;

          &--tl {
            cursor nwse-resize
            left -6px
            top -6px
          }

          &--tr {
            cursor: nesw-resize;
            right: -6px;
            top: -6px;
          }

          &--bl {
            bottom: -6px;
            cursor: nesw-resize;
            left: -6px;
          }

          &--br {
            bottom: -6px;
            cursor: nwse-resize;
            right: -6px;
          }
        }
      }
    }
  }

  .o-image-menu {
    //
    .q-field__control, .q-field__marginal {
      height 32px

      .q-field__suffix {
        line-height 15px
        color #aaaaaa
      }
    }

    .q-btn-group {
      .q-btn--active {
        background rgba(#1976D2, 0.2) !important
      }
    }
  }
</style>
