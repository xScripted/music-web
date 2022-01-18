import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/Main.vue')
  },
  {
    path: '/configuration',
    name: 'configuration',
    component: () => import('@/views/Configuration.vue'),
    children: [
      {
        path: '',
        name: 'configuration-general',
        component: () => import('@/modules/configuration/components/General.vue')
      },
      {
        path: 'tag-creator',
        name: 'tag-creator',
        component: () => import('@/modules/configuration/components/TagCreator.vue')
      },
      {
        path: 'playlist-editor',
        name: 'playlist-editor',
        component: () => import('@/modules/configuration/components/PlaylistEditor.vue')
      },
      {
        path: 'imports',
        name: 'imports',
        component: () => import('@/modules/configuration/components/Imports.vue')
      },
      {
        path: 'exports',
        name: 'exports',
        component: () => import('@/modules/configuration/components/Exports.vue')
      }
    ]
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
