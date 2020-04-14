<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated v-if="false">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen"/>

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="200"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <template v-for="(item, index) in essentialLinks">
          <div :key="index">
            <q-item-label header class="text-grey-8" v-if="item.groupLabel">
              {{item.groupLabel}}
            </q-item-label>
            <essential-link v-bind="item" />
          </div>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'src/components/EssentialLink'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        { title: 'Basic', caption: 'Basic extensions', icon: 'mdi-pencil', type: 'route', to: '/quasar-tiptap/basic', groupLabel: 'quasar-tiptap' },
        { title: 'Readonly', caption: 'readonly', icon: 'mdi-eye', type: 'route', to: '/quasar-tiptap/readonly' },
        { title: 'Full Featured', caption: 'All extensions', icon: 'mdi-text-box', type: 'route', to: '/quasar-tiptap/all' },
      ]
    }
  }
}
</script>
