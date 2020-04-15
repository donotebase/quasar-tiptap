<template>
  <q-layout view="hHh Lpr fFf">
    <q-drawer
      v-model="leftDrawerOpen"
      :width="200"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <template v-for="(item, index) in links">
          <div :key="index">
            <q-item-label header class="text-grey-8" v-if="item.groupLabel">
              {{item.groupLabel}}
            </q-item-label>
            <q-item :to="item.to" clickable>
              <q-item-section v-if="item.icon" avatar>
                <q-icon :name="item.icon" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ item.title }}</q-item-label>
                <q-item-label caption>
                  {{ item.caption }}
                </q-item-label>
              </q-item-section>
            </q-item>
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
export default {
  name: 'MainLayout',

  components: {
  },

  data () {
    return {
      leftDrawerOpen: false,
      links: [
        { title: 'Basic', caption: 'Basic extensions', icon: 'mdi-pencil', type: 'route', to: '/examples/basic', groupLabel: 'examples' },
        { title: 'Readonly', caption: 'readonly', icon: 'mdi-eye', type: 'route', to: '/examples/readonly' },
        { title: 'Full Featured', caption: 'All extensions', icon: 'mdi-text-box', type: 'route', to: '/examples/all' },
      ]
    }
  }
}
</script>
