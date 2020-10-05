<template>
  <o-block-card class="o-embed" :class="src ? '' : 'no-data'"
                :view="view"
                :selected="selected"
                :get-pos="getPos"
                :toolbar="view.editable">
    <template slot="toolbar-left">
      <q-input v-model="originalLink"
               ref="link"
               :placeholder="$o.lang.embed.linkTips"
               standout="bg-grey-3"
               :autofocus="true"
               clearable
               @keyup.enter="onConfirm"
               @paste.stop.native>
        <template v-slot:prepend>
          <div class="row items-center">
            <svg class="icon" aria-hidden="true" v-if="service.svgIcon">
              <use :xlink:href="`#icon-${service.svgIcon}`"></use>
            </svg>
            <q-icon :name="service.icon || 'apps'" :color="service.color" v-else />
            <q-tooltip anchor="top middle" self="bottom middle">{{$o.lang.embed[service.value]}}</q-tooltip>
          </div>
        </template>
      </q-input>
    </template>
    <template slot="toolbar-right">
      <q-btn :label="$o.lang.label.example" class="" dense flat @click="onViewExample" />
      <q-btn-dropdown dropdown-icon="more_vert" split flat @click="onConfirm">
        <span class="text-blue" slot="label">{{$o.lang.label.submit}}</span>
        <q-list style="min-width: 120px;">
          <o-common-item icon="settings" :label="$o.lang.label.settings" v-if="service.settings">
            <q-menu ref="imgRef" anchor="top right" self="top left" content-class="o-menu o-embed-settings-menu">
              <section class="q-px-md q-pb-sm" style="min-width: 300px">
                <div class="row justify-between items-center text-bold q-py-sm">
                  <div>
                    {{service.label}} {{$o.lang.label.settings}}
                  </div>
                  <div><q-btn icon="close" size="0.7rem" flat dense @click="$refs.imgRef.hide()" /></div>
                </div>
                <q-separator />
                <div class="row col-12 items-start q-py-md">
                  <q-toggle v-model="autoplayToggle" label="Autoplay" @input="onAutoplaySet" />
                </div>
              </section>
            </q-menu>
          </o-common-item>
          <o-common-item icon="delete" :label="$o.lang.label.remove" @click.native="onDelete" />
          <o-common-item icon="help_outline" :label="$o.lang.label.help" @click.native="onHelp" />
        </q-list>
      </q-btn-dropdown>
    </template>

    <div class="o-embed-content" v-if="src">
      <div class="cover"></div>
      <iframe class="iframe"
              :src="src"
              :style="{height: `${height}px`}"
              frameborder="0"
              allowfullscreen="true"
              @load="onLoaded"
              v-show="!loading">
      </iframe>
      <div class="row justify-center items-center iframe" v-show="loading">
        <q-spinner color="primary" size="3em" />
      </div>
    </div>
  </o-block-card>
</template>

<script>
import OBlockCard from 'src/components/common/OBlockCard'
import OCommonItem from 'src/components/common/OCommonItem'
import { getEmbedService, getServiceSrc, EmbedServiceLink } from 'src/data/embed'
import { updateQueryStringItem } from 'src/utils/uri'

export default {
  name: 'o-embed',
  data () {
    return {
      originalLink: '',
      autoplayToggle: false,
      fullScreen: false,
      loading: true
    }
  },
  props: ['node', 'updateAttrs', 'view', 'selected', 'getPos'],
  components: {
    OBlockCard,
    OCommonItem
  },
  methods: {
    onViewExample () {
      let link = EmbedServiceLink[this.service.value]
      if (link) {
        this.originalLink = link.link
        this.link = link.link
        this.src = link.src
      }
    },
    onConfirm () {
      let result = getServiceSrc(this.service.value, this.originalLink)
      if (!result.validLink || !result.validId) {
        this.$q.notify({
          color: 'red',
          icon: 'mdi-alert-circle',
          message: `${this.$o.lang.embed[this.service.value]}, ${this.$o.lang.embed.linkWarning}`,
          position: 'top',
          timeout: 1500
        })
        return
      }

      this.originalLink = result.originalLink
      this.link = result.originalLink
      this.src = this.buildSrc(result.src)

      console.log('src', this.src)
    },
    buildSrc (src) {
      switch (this.service.value) {
        case 'youtube':
          src = updateQueryStringItem(src, 'autoplay', this.autoplay)
          break
      }
      return src
    },
    onAutoplaySet () {
      this.autoplay = this.autoplayToggle ? '1' : '0'
      this.src = updateQueryStringItem(this.src, 'autoplay', this.autoplay)
    },
    onDelete () {
      let tr = this.view.state.tr
      let pos = this.getPos()
      tr.delete(pos, pos + this.node.nodeSize)
      this.view.dispatch(tr)
    },
    onHelp () {
      let service = this.service.value || ''
      service = service.replace('_', '-')
      let url = `https://github.com/donotebase/quasar-tiptap/wiki/Embed#${service}`

      window.open(url, '_blank')
    },
    onLoaded () {
      this.loading = false
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
    },
    autoplay: {
      get () {
        return this.node.attrs.autoplay
      },
      set (autoplay) {
        this.updateAttrs({
          autoplay
        })
      }
    }
  },
  mounted () {
    if (this.link) {
      this.originalLink = this.link
    } else {
      setTimeout(() => {
        this.$refs.link.focus()
      }, 300)
    }

    if (this.service.value === 'amap') {
      this.loading = false
    }

    this.autoplayToggle = (this.autoplay === '1')
  }
}
</script>

<style lang="stylus">
  .o-embed {
    .o-embed-content {
      position relative
      width 100%
    }

    .cover {
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      cursor pointer
      background rgba(0, 0, 0, 0.05)
    }

    .iframe {
      width 100%
      height 500px
      border solid 1px rgba(0,0,0,0.05)
      border-radius 5px
      transition all 0.3s linear
    }

    &.fullscreen {
      .iframe {
        height calc(100vh - 40px) !important
        border-radius 0px
      }
    }
  }

  .selected .o-embed-content {
    .cover {
      display none
    }
  }

  .fullscreen .o-embed-content {
    .cover {
      display none
    }
  }
</style>
