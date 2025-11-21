<template>
  <n-form
    :model="form"
    :rules="rules"
    label-placement="top"
    class="space-y-4"
  >
    <!-- Name -->
    <n-form-item label="Product Name" path="name">
      <n-input v-model:value="form.name" placeholder="Enter product name" />
    </n-form-item>

    <!-- Price -->
    <n-form-item label="Price" path="price">
      <n-input-number
        v-model:value="form.price"
        placeholder="Enter price"
        class="w-full"
      />
    </n-form-item>

    <!-- Category -->
    <n-form-item label="Category" path="category">
      <n-input v-model:value="form.category" placeholder="Enter category" />
    </n-form-item>

    <!-- Buttons -->
    <div class="flex justify-end gap-3 pt-4">
      <n-button tertiary :disabled="loading" @click="emit('close')">
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
import { ref } from "vue"
import axios from "axios"
import { useNotification } from "naive-ui"
import { useStore } from "vuex"

const emit = defineEmits(["success", "close"])
const store = useStore()
const notify = useNotification()

const loading = ref(false)

const form = ref({
  name: "",
  price: null,
  category: ""
})

const rules = {
  name: { required: true, message: "Name is required", trigger: "blur" },
  price: { required: true, message: "Price is required", trigger: "blur", type: 'number' },
  category: { required: true, message: "Category is required", trigger: "blur" }
}

async function handleSubmit() {
  try {
    loading.value = true

    await axios.post("/service/api/products", form.value)

    // refresh data store
    await store.dispatch("fetchDataProducts")

    notify.success({
      title: "Success",
      description: "Product added successfully"
    })

    await store.dispatch('fetchDataProducts')

    emit("success") // untuk nutup modal parent

    // reset form
    form.value = { name: "", price: null, category: "" }
  } catch (err) {
    console.error(err)

    notify.error({
      title: "Error",
      description: "Failed to add product"
    })
  } finally {
    loading.value = false
  }
}
</script>
