<script setup lang="ts">
import Tabs from './components/Tabs.vue';

</script>

<template>
  <div class="w-full flex items-start justify-center">

    <div class="md:container">
        <div class="w-full rounded border border-[#E9EBE8] bg-white mt-4 p-2">
            <Tabs/>
            <div class="pt-8">
              <router-view />
            </div>
            <!-- <DataTable class="mt-4"/> -->
        </div>
    </div>
  </div>
</template>

<style scoped></style>
