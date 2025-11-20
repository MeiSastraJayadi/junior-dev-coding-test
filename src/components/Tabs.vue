<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const activeTab = ref(route.name ?? 'Users')

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
            <n-tabs @update:value="onChanges" @value="activeTab" type="segment">
                <n-tab name="Users">User</n-tab>
                <n-tab name="Products">Product</n-tab>
            </n-tabs>
        </div>
        
        <div class="flex items-center">
            <!-- <PageDropDown/>
            <SearchBar/> -->
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
