<script setup lang="ts">
import Tabs from './components/Tabs.vue';

</script>

<template>
  <div class="w-full flex items-start justify-center">
    <div class="md:container">
       <n-notification-provider>
          <div class="w-full shadow shadow-lg rounded border border-[#E9EBE8] bg-white mt-4 p-2">
              <Tabs/>
              <div class="pt-8">
                  <router-view />
              </div>
          </div>
       </n-notification-provider>
    </div>
  </div>
</template>

<style scoped></style>
