<template>
  <q-layout view="hHh Lpr fFf" class="o-layout">
    <q-drawer
      v-model="leftDrawerOpen"
      :width="240"
      :mini="miniState"
      show-if-above
      bordered
      content-class="bg-grey-1 o-drawer"
    >
      <header class="row justify-center items-center">
        <q-btn icon="mdi-github" flat @click="gotoRepo">
          <div class="q-px-xs" v-if="!miniState">Quasar Tiptap</div>
        </q-btn>
      </header>

      <q-separator />

      <q-list>
        <template v-for="(item, index) in links">
          <div :key="index">
            <q-expansion-item :icon="item.icon" :label="item.label" v-if="item.group"
                              default-opened>
              <q-item v-for="(subitem, j) in item.children" :key="j" :to="subitem.to" class="sub-item" clickable>
                <q-item-section v-if="subitem.icon" avatar>
                  <q-icon :name="subitem.icon" size="1rem" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ subitem.label }}</q-item-label>
                  <q-item-label caption>
                    {{ subitem.caption }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
            </q-expansion-item>
          </div>
        </template>
      </q-list>

      <div class="drawer-toggle absolute" style="bottom: 50px; right: -12px">
        <q-btn color="blue" :icon="miniState ? `chevron_right` : `chevron_left`" dense round
               @click="miniState = !miniState" />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MainLayout',
  components: {
  },
  data () {
    return {
      leftDrawerOpen: false,
      miniState: false,
      links: [
        {
          label: 'Examples',
          icon: 'apps',
          group: true,
          children: [
            { label: 'Basic', caption: 'Basic extensions', icon: 'mdi-pencil', type: 'route', to: '/examples/basic', groupLabel: 'examples' },
            { label: 'Readonly', caption: 'readonly', icon: 'mdi-eye', type: 'route', to: '/examples/readonly' },
            { label: 'Full Featured', caption: 'All extensions', icon: 'mdi-text-box', type: 'route', to: '/examples/all' },
          ]
        },
        {
          label: 'Usages',
          icon: 'book',
          group: false,
          children: [
            { label: 'Basic', caption: 'Basic extensions', icon: 'mdi-pencil', type: 'route', to: '/examples/basic', groupLabel: 'examples' },
            { label: 'Readonly', caption: 'readonly', icon: 'mdi-eye', type: 'route', to: '/examples/readonly' },
            { label: 'Full Featured', caption: 'All extensions', icon: 'mdi-text-box', type: 'route', to: '/examples/all' },
          ]
        },
      ]
    }
  },
  methods: {
    gotoRepo () {
      openURL('https://github.com/donotebase/quasar-tiptap')
    }
  }
}
</script>

<style lang="stylus">
  .o-layout {
    header {
      height 50px
      width 100%
    }

    .drawer-toggle {
      display none
      .q-btn__wrapper {
        min-width 1.6rem !important
        min-height 1.6rem !important
      }
    }

    .o-drawer:hover {
      .drawer-toggle {
        display block
      }
    }
  }
</style>
