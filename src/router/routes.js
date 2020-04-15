
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'tiptap/basic', component: () => import('pages/tiptap/basic/index.vue') },
      { path: 'tiptap/test1', component: () => import('pages/tiptap/basic/index.vue') },
      { path: 'tiptap/test2', component: () => import('pages/tiptap/basic/index.vue') },
      { path: 'examples/basic', component: () => import('pages/examples/basic.vue') },
      { path: 'examples/readonly', component: () => import('pages/examples/readonly.vue') },
      { path: 'examples/all', component: () => import('pages/examples/all.vue') }
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
