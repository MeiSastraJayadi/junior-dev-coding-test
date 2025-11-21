<template>
    <n-button @click="showModal = true" type="success" dashed>
      <template #icon>
        <n-icon>
          <AddOutline />
        </n-icon>
      </template>
      <slot></slot>
    </n-button>
    <n-modal
        v-model:show="showModal"
        preset="card"
        :title="`${currentName} Form`"
        class="md:!w-[40%] sm:!w-full"
    >
        <UserForm
        @success="closeModal"
        @cancel="closeModal" v-if="currentName == 'User'"
        />
        <ProductForm 
        @success="closeModal"
        @cancel="closeModal" v-if="currentName == 'Product'"/>
    </n-modal>
</template>

<script setup lang="ts">
import { AddOutline } from '@vicons/ionicons5'
import UserForm from './UserForm.vue'
import ProductForm from './ProductForm.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentName = ref<string>(route.name?.toString() ?? "")

watch(
  () => route.name,
  () => {
    currentName.value = route.name?.toString() ?? ""
  }
)

const showModal = ref(false)

function closeModal() {
  showModal.value = false
}

</script>