<template>
  <div class="file-upload-view">
    <h1>Vulnerability Scanner</h1>

    <FileUpload @scanCompleted="updateResults" @reset="handleReset" />

    <VulnerabilityTable v-if="results.length > 0" :results="results" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import FileUpload from '@/components/FileUpload.vue'
import VulnerabilityTable from '@/components/VulnerabilityTable/VulnerabilityTable.vue'

export default defineComponent({
  name: 'FileUploadView',
  components: {
    FileUpload,
    VulnerabilityTable,
  },
  setup() {
    const results = ref<unknown[]>([])
    const updateResults = (newResults: unknown) => {
      results.value = Array.isArray(newResults) ? newResults : []
    }
    const handleReset = () => {
      results.value = [] // Clear the results
    }

    return {
      results,
      updateResults,
      handleReset,
    }
  },
})
</script>

<style scoped>
.file-upload-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  margin: 0;
  padding-top: 40px;
}

/* Styling for the header */
h1 {
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

/* Center the file upload container */
.file-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 450px;
  max-width: 100%;
}

/* Styling for the button (optional for visual clarity) */
button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>
