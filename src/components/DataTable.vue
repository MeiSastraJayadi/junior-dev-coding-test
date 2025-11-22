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

  <n-modal
    v-model:show="showModal"
    preset="card"
    :title="`${currentName} Form`"
    class="md:!w-[40%] max-[600px]:!w-[90%]"
  >
    <UserForm
      v-if="currentName === 'User'"
      :initialData="selectedRow && 'email' in selectedRow ? selectedRow : undefined"
      @success="closeModal"
      @cancel="closeModal"
    />
    <ProductForm
      v-if="currentName === 'Product'"
      :initialData="selectedRow && 'price' in selectedRow ? selectedRow : undefined"
      @success="closeModal"
      @cancel="closeModal"
    />
  </n-modal>
</template>

<script setup lang="ts">
import { NButton, useDialog, useNotification, type DataTableColumns } from 'naive-ui'
import { computed, h, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { type Product, type User } from '../store'
import { useRoute } from 'vue-router'
import { TrashOutline, CreateOutline } from '@vicons/ionicons5'
import UserForm from './UserForm.vue'
import ProductForm from './ProductForm.vue'
import axios, { AxiosError } from 'axios'


const API_BASE_URL = import.meta.env.API_BASE_URL || "https://jobzenix.site/service-vue"; 
const route = useRoute()
const currentName = ref<string>(route.name?.toString() ?? "")
const showModal = ref(false)
const selectedRow = ref<User | Product | null>(null)

function closeModal() {
  showModal.value = false
  selectedRow.value = null
}

interface UserRow {
  id?: number
  name: string
  email: string
  created_at: string
  updated_at: string
}

interface ProductRow {
  id?: number
  name: string
  price: number
  category: string
  created_at: string
  updated_at: string
}

type Path = "User" | "Product"
type RowType<P extends Path> = P extends "Product" ? ProductRow : UserRow

function createColumns<P extends Path>(path: P): DataTableColumns<RowType<P>> {
  const baseColumns: DataTableColumns<RowType<P>> = path === "Product"
    ? [
        { title: "Name", key: "name", fixed: 'left' },
        { title: "Price", key: "price", fixed: 'left' },
        { title: "Category", key: "category" },
        { title: 'Created At', key: 'created_at', render(row) { return new Date(row.created_at).toLocaleString() } },
        { title: 'Updated At', key: 'updated_at', render(row) { return new Date(row.updated_at).toLocaleString() } },
      ]
    : [
        { title: "Name", key: "name", fixed: 'left' },
        { title: "Email", key: "email", fixed: 'left' },
        { title: 'Created At', key: 'created_at', render(row) { return new Date(row.created_at).toLocaleString() } },
        { title: 'Updated At', key: 'updated_at', render(row) { return new Date(row.updated_at).toLocaleString() } },
      ]

  // Action column
  baseColumns.push({
    title: 'Action',
    key: 'action',
    fixed: 'right',
    render(row: RowType<P>) {
      return h('div', { class: 'flex gap-1' }, [
        h(NButton, {
          size: 'small',
          type: 'info',
          dashed: true,
          onClick: () => handleUpdate(row as User | Product)
        }, { default: () => [h(CreateOutline, { class: 'mr-1' }), 'Update'] }),
        h(NButton, {
          size: 'small',
          type: 'error',
          dashed: true,
          onClick: () => deleteDialog(row as User | Product)
        }, { default: () => [h(TrashOutline, { class: 'mr-1' }), 'Delete'] })
      ])
    }
  })

  return baseColumns
}

const store = useStore()
const data = computed(() => route.name === "Product" ? store.state.products : store.state.users)
const notification = useNotification()

async function loadData() {
  if (route.name === "Product") {
    store.dispatch("fetchDataProducts")
  } else {
    store.dispatch("fetchDataUsers")
  }
}

onMounted(loadData)
watch(() => route.name, () => {
  loadData()
  currentName.value = route.name?.toString() ?? ""
})

function getPath(): Path {
  return route.name === "Product" ? "Product" : "User"
}

const columns = computed(() => createColumns(getPath()))
const pagination = { pageSize: 10 }
const dialog = useDialog()

// Action handlers
function handleUpdate(row: User | Product) {
  selectedRow.value = row
  showModal.value = true
}

function deleteDialog(row: User | Product) {
  const d = dialog.info({
    title: 'Delete record',
    content: `Are you sure want to delete ${row.name}?`,
    positiveText: 'Sure',
    negativeText: 'Not Sure',
    maskClosable: false,
    onPositiveClick: () => {
      d.loading = true
      return handleDelete(row)
    }
  })
}

async function handleDelete(row: User | Product) {
  try {
    if ('email' in row) {
      await axios.delete(`${API_BASE_URL}/service/api/users/${row.id}`)
      notification.success({
        title: "Success",
        description: "User has been deleted."
      })
      await store.dispatch('fetchDataUsers')
    } else {
      await axios.delete(`${API_BASE_URL}/service/api/products/${row.id}`)
      notification.success({
        title: "Success",
        description: "Product has been deleted"
      })
      await store.dispatch('fetchDataProducts')
    }
  } catch(err : unknown) {
    const axiosErr = err as AxiosError<{ message: string }>
    notification.error({
      title: "Error",
      description: axiosErr?.response?.data?.message || "Failed to delete the record."
    })
  }
}
</script>
