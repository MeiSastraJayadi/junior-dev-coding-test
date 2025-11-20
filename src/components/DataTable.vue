<template>
    <n-space vertical>
      <n-data-table
        :columns="columns"
        :data="data"
        :pagination="pagination"
        class="h-[80vh]"
        flex-height
      >
      <template #empty>
        <div class="flex flex-col items-center justify-center py-10 text-center text-gray-500">
          <!-- <img
            src="/box-add.png"
            alt="No Data"
            class="w-32 h-32 mb-4 opacity-80"
          /> -->
          <h2 class="text-base font-medium">Barang masih kosong</h2>
          <p class="text-sm text-gray-400">Tambah barang untuk mulai berjualan</p>
        </div>
      </template>
    </n-data-table>
    </n-space>
  </template>
  
<script setup lang="ts">
import { NSwitch, type DataTableColumns } from 'naive-ui'
import { h, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { type Product, type User } from '../store'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentName = route.name as string
  
interface RowData {
    name: string 
    email: string
    active: boolean
}
  
function createColumns(path: string): DataTableColumns<RowData> {
  if (path == 'Products') {
    return [
      {
        title: 'Name',
        key: 'name'
      },
      {
        title: 'Price',
        key: 'price',
      },
      {
        title: 'Category',
        key: 'category',
      },
      {
        title: 'Tindakan',
        key: 'action',
        render: (row: RowData) =>
        h(NSwitch, {
            value: row.active,
            'onUpdate:value': (val: boolean) => {
                row.active = val
            }
        })
      }
    ]
  } else {
    return [
      {
        title: 'Name',
        key: 'name'
      },
      {
        title: 'email',
        key: 'email',
      },
      {
        title: 'Tindakan',
        key: 'action',
        render: (row: RowData) =>
        h(NSwitch, {
            value: row.active,
            'onUpdate:value': (val: boolean) => {
                row.active = val
            }
        })
      }
    ]
  }
}
  

const store = useStore();
const data = ref<User[]|Product[]>([])

const fetchUsers = async () => {
  await store.dispatch('fetchDataUsers') 
  data.value = store.state.users
}

const fetchProducts = async () => {
  await store.dispatch('fetchDataProducts') 
  data.value = store.state.products
}

onMounted(() => {
  if (currentName == "Products") {
    fetchProducts();
  } else {
    fetchUsers()
  }
})


const columns = createColumns(currentName)
const pagination = { pageSize: 10 }
</script>