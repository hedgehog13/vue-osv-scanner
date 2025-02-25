<template>
  <div>
    <h2>Upload a File to Scan</h2>
    <FileUpload @scanCompleted="updateResults" />
    <VulnerabilityTable v-if="results?.length" :results="results" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import FileUpload from '@/components/FileUpload.vue'
import VulnerabilityTable from '@/components/VulnerabilityTable/VulnerabilityTable.vue'

export default defineComponent({
  name: 'FileUploadView',
  components: {
    FileUpload,
    VulnerabilityTable,
  },
  setup() {
    const results = ref<VulnerabilityResult[]>([])
    // Handle scanCompleted event and update results
    const updateResults = (scanResults: VulnerabilityResult[]) => {
      results.value = scanResults
    }

    return {
      results,
      updateResults,
    }
  },
})
</script>
