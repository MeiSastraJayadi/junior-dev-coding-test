import axios from 'axios'
import { createStore } from 'vuex'

const API_BASE_URL = import.meta.env.API_BASE_URL || "https://jobzenix.site/service-vue"; 

export interface User {
  id: number
  name: string
  email: string
  created_at: string; 
  updated_at: string; 
}

export interface Product {
    id: number 
    name: string 
    price: number 
    category: string 
    created_at: string 
    updated_at: string 
}

export interface DataTable {
    name: string
    price: number 
    updated: string 
    is_active: boolean
}



export interface RootState {
  users: User[]
  products: Product[]
  loading: boolean
  page: number
  pageTotal: number
  dataTable: DataTable[]
  error: string | null, 
  closeModal: boolean
}


export default createStore<RootState>({
  state: (): RootState => ({
    users: [],
    products: [],
    loading: false,
    page: 1,
    pageTotal: 5,
    dataTable: [],
    error: null, 
    closeModal: false
  }),
  mutations: {
    SET_LOADING(state: RootState, value: boolean) {
      state.loading = value;
    },
    SET_USERS(state: RootState, users: User[]) {
      state.users = users;
    },
    SET_ERROR(state: RootState, error: string | null) {
      state.error = error;
    },
    SET_DATATABLE(state: RootState, value: DataTable[]) {
      state.dataTable = value;
    },
    SET_PRODUCTS(state: RootState, products: Product[]) {
      state.products = products;
    }, 
    SET_CLOSE_MODAL(state: RootState, value : boolean) {
      state.closeModal = value
    }
  },
  actions: {
    async fetchDataUsers({ commit } : any, payload?: { search?: string }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        let url = `${API_BASE_URL}/api/users`
        if (payload?.search) {
          url += `?search=${encodeURIComponent(payload.search)}`
        }
        const res = await axios.get(url)
        commit('SET_USERS', res.data.data)
      } catch (err: any) {
        commit('SET_ERROR', err.message || 'Failed to fetch users')
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async fetchDataProducts({ commit } : any, payload?: { search?: string }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        let url = `${API_BASE_URL}/api/products`
        if (payload?.search) {
          url += `?search=${encodeURIComponent(payload.search)}`
        }
        const res = await axios.get(url)
        commit('SET_PRODUCTS', res.data.data)
      } catch (err: any) {
        commit('SET_ERROR', err.message || 'Failed to fetch users')
      } finally {
        commit('SET_LOADING', false)
      }
    },
    closeModal({ commit } : any) {
      commit('SET_CLOSE_MODAL', true)
    }, 
    openModal({ commit } : any) {
      commit('SET_CLOSE_MODAL', false)
    }

  },
  getters: {
    userCount: (state: RootState) => state.users.length,
    activeUsers: (state: RootState) => state.users.filter(u => u.email.includes('@'))
  }
})