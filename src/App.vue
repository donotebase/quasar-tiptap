<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import { QuasarTiptapPlugin } from './index'

Vue.use(QuasarTiptapPlugin, {
  language: 'zh-hans',
  spellcheck: true
})

export default {
  name: 'App'
}
</script>
