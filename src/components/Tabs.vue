<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Button from './Button.vue'

const router = useRouter()
const route = useRoute()

const currentName = ref<string>(route.name?.toString() ?? "")

watch(
  () => route.name,
  () => {
    currentName.value = route.name?.toString() ?? ""
  }
)

function onChanges(value: string) {
  router.push({ name: value })
}

</script>


<template>
    <div>
      <!-- Filter bar -->
      <div class="flex items-center justify-between">
        <!-- Tabs filter -->
        <div class="flex w-[30%]">
            <n-tabs class="!shadow-inner" @update:value="onChanges" v-model:value="currentName" type="segment">
                <n-tab name="User">User</n-tab>
                <n-tab name="Product">Product</n-tab>
            </n-tabs>
        </div>
        
        <div class="flex items-center">
            <!-- <PageDropDown/>
            <SearchBar/> -->
            <Button>
              Add {{ currentName }}
            </Button>
        </div>
  
      </div>
    </div>
</template>
  
  <style scoped>
  .n-tabs {
    @apply flex-shrink-0;
  }
  .n-tabs-tab--active .n-tabs-tab__label {
    color:#0B557F !important;
  }
</style>
