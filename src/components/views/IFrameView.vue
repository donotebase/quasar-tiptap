<template>
  <section class="o-iframe iframe">
    <div class="row col-12 o-toolbar" v-if="view.editable">
      <q-input v-model="src" :placeholder="$t('link')" debounce="300" class="col-9 input text-red" standout clearable @paste.stop.native>
        <template v-slot:prepend>
          <q-icon name="link" />
        </template>
      </q-input>
      <q-input v-model="height" :placeholder="$t('height')" suffix="px" class="col-3 input text-red" standout @paste.stop.native>
        <template v-slot:prepend>
          <q-icon name="height" />
        </template>
      </q-input>
    </div>
    <iframe class="iframe" :src="src" :style="{height: `${height}px`}"></iframe>
  </section>
</template>

<script>
export default {
  name: 'o-iframe',
  data () {
    return {
    }
  },
  props: ['node', 'updateAttrs', 'view'],
  components: {
  },
  methods: {
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
    height: {
      get () {
        return this.node.attrs.height || 400
      },
      set (height) {
        this.updateAttrs({
          height
        })
      }
    }
  }
}
</script>

<style lang="stylus">
  .o-iframe {
    position relative

    .o-toolbar {
      position absolute
      top -44px
      width 100%
      height 40px
      margin 4px 0
      background #efefef
      border-radius 5px
      visibility hidden

      .q-input {
        padding 0 4px
      }

      .q-field__control, .q-field__marginal {
        height 32px
      }

      .q-field__suffix {
        line-height unset
      }
    }
    .iframe {
      width 100%
      height 400px
      border solid 1px rgba(0,0,0,0.05)
      border-radius 5px
    }
  }

  .o-iframe:hover {
    .o-toolbar {
      visibility visible
    }
  }
</style>
