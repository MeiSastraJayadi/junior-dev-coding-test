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
        Save
      </n-button>
    </div>
  </n-form>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import type { AxiosError } from 'axios'
import { useNotification } from 'naive-ui'
import { useStore } from 'vuex'

const emit = defineEmits(["success", "cancel"])
const store = useStore();

const loading = ref(false)

const form = ref({
  name: "",
  email: "",
  role: null,
})

const rules = {
  name: { required: true, message: "Name is required", trigger: "blur" },
  email: { required: true, message: "Email is required", trigger: "blur" },
}

const notification = useNotification()

async function handleSubmit() {
  try {
    loading.value = true

    await axios.post("/service/api/users", form.value)

    notification.success({
      title: "Success",
      description: "User created successfully."
    })

    await store.dispatch('fetchDataUsers')

    emit("success")

    form.value = { name: "", email: "", role: null }

  } catch (err : unknown) {
    const axiosErr = err as AxiosError<{ message: string }>;
    notification.error({
      title: "Error",
      description: axiosErr?.response?.data?.message || "Failed to create user."
    })

  } finally {
    loading.value = false
  }
}
</script>
