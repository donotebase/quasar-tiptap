<template>
  <section class="o-embed-menu">
    <section v-for="(group, i) of services" :key="`group-${i}`">
      <div class="group">{{$o.lang.embed[group.value]}}</div>

      <section class="row col-12 q-col-gutter-sm services">
        <div class="row col-3" v-for="(service, j) of group.children" :key="`service-${i}-${j}`">
          <q-item class="col-12" clickable v-close-popup @click="select(service)">
            <q-item-section avatar>
              <img :src="`statics/service/${service.svgIcon}.svg`" v-if="service.svgIcon" />
              <q-icon :name="service.icon || 'apps'" :color="service.color" v-else />
            </q-item-section>
            <q-item-section>
              {{$o.lang.embed[service.value]}}
            </q-item-section>
          </q-item>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import {
  VideoServices,
  MapServices,
  DesignServices,
  DevelopServices,
  DataServices,
  OtherServices
} from 'src/data/embed'
export default {
  name: 'o-embed-menu',
  data () {
    return {
    }
  },
  methods: {
    select (service) {
      this.$emit('select', service)
    }
  },
  computed: {
    services () {
      return [
        {
          label: 'Video',
          value: 'video',
          children: VideoServices
        },
        {
          label: 'Map',
          value: 'map',
          children: MapServices
        },
        {
          label: 'Design',
          value: 'design',
          children: DesignServices
        },
        {
          label: 'Develop',
          value: 'develop',
          children: DevelopServices
        },
        {
          label: 'Data',
          value: 'data',
          children: DataServices
        },
        {
          label: 'Others',
          value: 'others',
          children: OtherServices
        }
      ]
    }
  }
}
</script>

<style lang="stylus">
  .o-embed-menu {
    padding 0 1rem 1rem 1rem

    .group {
      padding-top 1rem
    }

    .services {
      //
      .q-item {
        min-height 40px
        min-width 120px
        border-radius 4px
        background rgba(0, 0, 0, 0.03)
      }
      .q-item__section--avatar {
        min-width unset

        img {
          width 24px
          height 24px
        }
      }
      .q-item__section--side {
        padding-right 0
      }
    }
  }
</style>
