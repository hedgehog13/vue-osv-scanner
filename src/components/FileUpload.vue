<template>
  <div>
    <input type="file" @change="handleFileUpload" accept=".json" />
    <button @click="scanFile" :disabled="!file">Scan</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useFileUpload } from './FileUpload'

export default defineComponent({
  name: 'FileUpload',
  setup() {
    return useFileUpload()
  },
})
</script>

<style scoped src="./FileUpload.css"></style>
