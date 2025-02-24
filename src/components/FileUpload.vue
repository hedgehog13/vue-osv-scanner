<template>
  <div>
    <input type="file" @change="handleFileUpload" accept=".json" />
    <button @click="scanFile" :disabled="!file">Scan</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const file = ref<File | null>(null)

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    file.value = input.files[0]
  }
}

const scanFile = () => {
  if (!file.value) return
  console.log('Scanning file:', file.value.name)
}
</script>
