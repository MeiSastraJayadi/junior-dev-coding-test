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
        {{ buttonText }}
      </n-button>
    </div>
  </n-form>
</template>

<script setup lang="ts">
import { ref, watch, computed, defineProps } from "vue"
import axios from "axios"
import { useNotification } from "naive-ui"
import { useStore } from "vuex"

const API_BASE_URL = import.meta.env.API_BASE_URL || "https://jobzenix.site/service-vue"; 

interface ProductUpdate {
  id?: number
  name: string
  price: number | null
  category: string
}

const props = defineProps<{ initialData?: ProductUpdate }>()

const emit = defineEmits(["success", "close"])
const store = useStore()
const notify = useNotification()
const loading = ref(false)

const form = ref<ProductUpdate>({
  id: props.initialData?.id,
  name: props.initialData?.name || "",
  price: props.initialData?.price ?? null,
  category: props.initialData?.category || ""
})

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      form.value.id = newData.id
      form.value.name = newData.name
      form.value.price = newData.price ?? null
      form.value.category = newData.category
    } else {
      form.value.id = undefined
      form.value.name = ""
      form.value.price = null
      form.value.category = ""
    }
  },
  { immediate: true }
)

const buttonText = computed(() => form.value.id ? "Update" : "Save")

const rules = {
  name: { required: true, message: "Name is required", trigger: "blur" },
  price: { required: true, message: "Price is required", trigger: "blur", type: "number" },
  category: { required: true, message: "Category is required", trigger: "blur" }
}

async function handleSubmit() {
  try {
    loading.value = true

    if (form.value.id) {
      await axios.put(`${API_BASE_URL}/api/products/${form.value.id}`, form.value)
      notify.success({ title: "Success", description: "Product updated successfully" })
    } else {
      await axios.post(`${API_BASE_URL}/api/products`, form.value)
      notify.success({ title: "Success", description: "Product created successfully" })
    }

    await store.dispatch("fetchDataProducts")
    emit("success")

    form.value = { id: undefined, name: "", price: null, category: "" }
  } catch (err) {
    console.error(err)
    notify.error({ title: "Error", description: "Failed to submit product" })
  } finally {
    loading.value = false
  }
}
</script>
