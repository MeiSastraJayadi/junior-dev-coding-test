import DataTable from '@/components/DataTable.vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  { path: '/', name: 'Users', component: DataTable },
  { path: '/products', name: 'Products', component: DataTable },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
