<template>
  <div>
    <h2>Upload a File to Scan</h2>
    <FileUpload />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FileUpload from '@/components/FileUpload.vue'

export default defineComponent({
  name: 'FileUploadView',
  components: {
    FileUpload,
  },
})
</script>

<style scoped>
/* Add any styles specific to this view if needed */
</style>
