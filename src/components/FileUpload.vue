<template>
  <div class="file-upload-container">
    <h3>Upload Your File</h3>
    <div class="file-upload">
      <input type="file" @change="handleFileUpload" accept=".json" ref="fileInput" />

      <button @click="scanFile" :disabled="!file || isScanning" v-if="!scanComplete">
        {{ isScanning ? 'Scanning...' : 'Scan' }}
      </button>

      <!-- Reset button (visible after scan completes) -->
      <button @click="resetScan" v-if="scanComplete">Reset</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import { useFileUpload } from './FileUpload'
const fileInput = ref<HTMLInputElement | null>(null)
const emit = defineEmits<{
  (event: 'fileSelected', file: File): void
  (event: 'scanCompleted', results: unknown): void // To pass scan results
  (event: 'reset'): void // Emit reset event
}>()

const { file, handleFileUpload, scanFile, isScanning, scanComplete } = useFileUpload(emit)

const resetScan = () => {
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  file.value = null
  isScanning.value = false
  scanComplete.value = false
  emit('reset')
}
</script>

<style scoped src="./FileUpload.css"></style>
