<template>
  <n-form
    :model="form"
    :rules="rules"
    label-placement="top"
    class="space-y-4"
  >
    <n-form-item label="Name" path="name">
      <n-input v-model:value="form.name" placeholder="Enter name" />
    </n-form-item>

    <n-form-item label="Email" path="email">
      <n-input v-model:value="form.email" placeholder="Enter email" />
    </n-form-item>

    <div class="flex justify-end gap-3 pt-4">
      <n-button tertiary :disabled="loading" @click="emit('cancel')">
        Cancel
      </n-button>

      <n-button
        type="primary"
        :loading="loading"
        :disabled="loading"
        @click="handleSubmit"
      >
        {{ buttonText }}
      </n-button>
    </div>
  </n-form>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, computed } from 'vue'
import axios from 'axios'
import type { AxiosError } from 'axios'
import { useNotification } from 'naive-ui'
import { useStore } from 'vuex'

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://jobzenix.site/service-vue"; 

const emit = defineEmits(["success", "cancel"])
const store = useStore()
const notification = useNotification()
const loading = ref(false)

interface UserUpdate {
  id?: number
  name: string
  email: string
}

const props = defineProps<{
  initialData?: UserUpdate
}>()

const form = ref<UserUpdate>({
  name: props.initialData?.name || '',
  email: props.initialData?.email || '',
  id: props.initialData?.id,
})

watch(() => props.initialData, (newData) => {
  if (newData) {
    form.value.id = newData.id
    form.value.name = newData.name
    form.value.email = newData.email
  } else {
    form.value.id = undefined
    form.value.name = ''
    form.value.email = ''
  }
}, { immediate: true })

const buttonText = computed(() => {
  return form.value.id ? 'Update' : 'Save'
})

const rules = {
  name: { required: true, message: "Name is required", trigger: "blur" },
  email: { required: true, message: "Email is required", trigger: "blur" },
}

async function handleSubmit() {
  try {
    loading.value = true

    if (form.value.id) {
      await axios.put(`${VITE_API_BASE_URL}/api/users/${form.value.id}`, {
        name: form.value.name,
        email: form.value.email
      })
      notification.success({
        title: "Success",
        description: "User updated successfully."
      })
    } else {
      await axios.post(`${VITE_API_BASE_URL}/api/users`, {
        name: form.value.name,
        email: form.value.email
      })
      notification.success({
        title: "Success",
        description: "User created successfully."
      })
    }

    await store.dispatch('fetchDataUsers')
    emit("success")

    form.value = { name: "", email: "" }

  } catch (err: unknown) {
    const axiosErr = err as AxiosError<{ message: string }>
    notification.error({
      title: "Error",
      description: axiosErr?.response?.data?.message || "Failed to submit user."
    })
  } finally {
    loading.value = false
  }
}
</script>
