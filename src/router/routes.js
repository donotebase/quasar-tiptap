
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'tiptap/basic', component: () => import('pages/tiptap/basic/index.vue') },
      { path: 'tiptap/test1', component: () => import('pages/tiptap/basic/index.vue') },
      { path: 'tiptap/test2', component: () => import('pages/tiptap/basic/index.vue') },
      { path: 'quasar-tiptap/basic', component: () => import('pages/quasar-tiptap/basic.vue') },
      { path: 'quasar-tiptap/readonly', component: () => import('pages/quasar-tiptap/readonly.vue') },
      { path: 'quasar-tiptap/all', component: () => import('pages/quasar-tiptap/all.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
