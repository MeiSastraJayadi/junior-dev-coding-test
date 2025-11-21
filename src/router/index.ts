import DataTable from '@/components/DataTable.vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  { path: '/', redirect: '/users' },
  { path: '/users', name: 'User', component: DataTable },
  { path: '/products', name: 'Product', component: DataTable },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
