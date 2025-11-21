<template>
    <div class="flex items-center gap-2">
      <n-input
        v-model:value="searchQuery"
        :placeholder="`Search ${currentName}s...`"
        clearable
        class="w-60 rounded shadow"
      >
    <template #prefix>
        <n-icon>
        <SearchOutline />
        </n-icon>
    </template>
    </n-input>

    <n-spin v-if="loading" size="small" />
</div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { SearchOutline } from '@vicons/ionicons5'
import debounce from 'lodash/debounce'

const route = useRoute()
const store = useStore()

const currentName = ref<string>(route.name?.toString() ?? "")
const searchQuery = ref("")
const loading = ref(false)

watch(
    () => route.name,
    () => {
        currentName.value = route.name?.toString() ?? ""
        searchQuery.value = ""
    }
)

const doSearch = async (query: string) => {
loading.value = true
try {
    if (currentName.value.toLowerCase() === "product") {
    await store.dispatch("fetchDataProducts", { search: query })
    } else {
    await store.dispatch("fetchDataUsers", { search: query })
    }
} catch (err) {
    console.error(err)
} finally {
    loading.value = false
}
}

const debouncedSearch = debounce(doSearch, 500)

watch(searchQuery, (val) => {
    debouncedSearch(val)
})
</script>
