<template>
  <div class="file-upload-container">
    <h3>Upload Your File</h3>
    <div class="file-upload">
      <input type="file" @change="handleFileUpload" accept=".json" />
      <button @click="scanFile" :disabled="!file || isScanning">
        {{ isScanning ? 'Scanning...' : 'Scan' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import { useFileUpload } from './FileUpload'

const emit = defineEmits<{
  (event: 'fileSelected', file: File): void
  (event: 'scanCompleted', results: unknown): void // To pass scan results
}>()

const { file, handleFileUpload, scanFile, isScanning } = useFileUpload(emit)
</script>

<style scoped src="./FileUpload.css"></style>
