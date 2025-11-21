<script setup lang="ts">
import Tabs from './components/Tabs.vue';

</script>

<template>
  <div class="w-full flex items-start justify-center max-[600px]:px-2">
    <div class="md:container">
      <n-dialog-provider>
        <n-notification-provider>
          <div class="w-full shadow shadow-lg rounded border border-[#E9EBE8] bg-white mt-4 p-4">
              <Tabs/>
              <div class="pt-4">
                  <router-view />
              </div>
          </div>
        </n-notification-provider>
      </n-dialog-provider>
    </div>
  </div>
</template>

<style scoped></style>
