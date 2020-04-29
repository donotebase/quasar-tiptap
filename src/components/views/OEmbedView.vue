<template>
  <section class="o-embed iframe" :class="src ? '' : 'no-data'">
    <div class="row col-12 o-toolbar" v-if="view.editable">
      <q-input v-model="originalLink" placeholder="service" debounce="300" class="col text-red link" standout clearable @paste.stop.native>
        <template v-slot:prepend>
          <img :src="`statics/service/${service.svgIcon}.svg`" v-if="service.svgIcon" />
          <q-icon :name="service.icon || 'apps'" :color="service.color" v-else />
        </template>
      </q-input>
      <div class="row col-auto q-px-sm">
        <q-btn label="示例" class="q-mx-sm" />
        <q-btn label="确定" color="blue" @click="onConfirm" />
      </div>
    </div>
    <iframe class="iframe"
            :src="src"
            :style="{height: `${height}px`}"
            frameborder="0"
            allowfullscreen="true"
            v-if="src"></iframe>
  </section>
</template>

<script>
import { getEmbedService, getServiceSrc } from 'src/data/embed'
export default {
  name: 'o-embed',
  data () {
    return {
      originalLink: ''
    }
  },
  props: ['node', 'updateAttrs', 'view'],
  components: {
  },
  methods: {
    onConfirm () {
      let result = getServiceSrc(this.service.value, this.originalLink)
      if (!result.validLink || !result.validId) {
        console.warn('invalid link')
        this.$q.notify({
          color: 'red',
          icon: 'warning',
          message: 'Invalid link',
          timeout: 800
        })
        return
      }

      this.link = this.originalLink
      this.src = result.src
    }
  },
  computed: {
    service () {
      return getEmbedService(this.node.attrs.service)
    },
    link: {
      get () {
        return this.node.attrs.link
      },
      set (link) {
        this.updateAttrs({
          link
        })
      }
    },
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
        return this.node.attrs.height || 500
      },
      set (height) {
        this.updateAttrs({
          height
        })
      }
    }
  },
  mounted () {
    this.originalLink = this.link
  }
}
</script>

<style lang="stylus">
  .o-embed {
    position relative
    min-height 40px

    .o-toolbar {
      position absolute
      top -44px
      width 100%
      height 40px
      margin 4px 0
      background #efefef
      border-radius 5px
      visibility hidden

      .link {
        img {
          width 24px
          height 24px
        }
      }

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
      height 500px
      border solid 1px rgba(0,0,0,0.05)
      border-radius 5px
    }
  }

  .o-embed.no-data {
    .o-toolbar {
      top 0
      visibility visible
    }
  }

  .o-embed:hover {
    .o-toolbar {
      visibility visible
    }
  }
</style>
