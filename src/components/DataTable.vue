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
          <h2 class="text-base font-medium">Empty record</h2>
          <p class="text-sm text-gray-400">Add new record to view all data</p>
        </div>
      </template>
    </n-data-table>
    </n-space>
  </template>
  
<script setup lang="ts">
import { NSwitch, type DataTableColumns } from 'naive-ui'
import { computed, h, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { type Product, type User } from '../store'
import { useRoute } from 'vue-router'

const route = useRoute()
  
interface UserRow {
  name: string;
  email: string;
  created_at: string; 
  updated_at: string; 
}

interface ProductRow {
  name: string;
  price: number;
  category: string;
  created_at: string; 
  updated_at: string; 
}

type Path = "User" | "Product";

type RowType<P extends Path> = 
  P extends "Product" ? ProductRow : UserRow;
  
function createColumns<P extends Path>(path: P): DataTableColumns<RowType<P>> {
  if (path === "Product") {
    return [
      { title: "Name", key: "name" },
      { title: "Price", key: "price" },
      { title: "Category", key: "category" },
      {
        title: 'Created At',
        key: 'created_at',
        render(row) {
          return new Date(row.created_at).toLocaleString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      }, 
      {
        title: 'Updated At',
        key: 'updated_at',
        render(row) {
          return new Date(row.created_at).toLocaleString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      }
    ] as DataTableColumns<RowType<P>>;
  }

  return [
    { title: "Name", key: "name" },
    { title: "Email", key: "email" },
    {
      title: 'Created At',
      key: 'created_at',
      render(row) {
        return new Date(row.created_at).toLocaleString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    }, 
    {
      title: 'Updated At',
      key: 'updated_at',
      render(row) {
        return new Date(row.created_at).toLocaleString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    },
  ] as DataTableColumns<RowType<P>>;
}

const store = useStore();
const data = computed(() => {
  return route.name === "Product"
    ? store.state.products
    : store.state.users
})

async function loadData() {
  if (route.name === "Product") {
    store.dispatch("fetchDataProducts")
  } else {
    store.dispatch("fetchDataUsers")
  }
}

onMounted(() => {
  loadData(); 
})

watch(
  () => route.name,
  () => {
    loadData()
  }
)




const columns = computed(() => createColumns(route.name as string))
const pagination = { pageSize: 10 }
</script>