<template>
  <div>
    <input type="file" @change="handleFileUpload" accept=".json" />
    <button @click="scanFile" :disabled="!file">Scan</button>

    <div v-if="results.length">
      <h3>Vulnerabilities Found:</h3>
      <table>
        <thead>
          <tr>
            <th>Package</th>
            <th>Vulnerabilities</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in results" :key="index">
            <td>{{ result.package }}</td>
            <td>{{ result.vulnerabilities.length }}</td>
            <td>
              <button @click="toggleDetails(index)" v-if="result.vulnerabilities.length">
                {{ expandedRow === index ? 'Hide' : 'View' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="expandedRow !== null">
        <h4>Details for {{ results[expandedRow].package }}</h4>
        <div v-for="(vuln, vIndex) in results[expandedRow].vulnerabilities" :key="vIndex">
          <p><strong>ID:</strong> {{ vuln.id }}</p>
          <p><strong>Summary:</strong> {{ vuln.summary }}</p>
          <p><strong>Severity:</strong> {{ vuln.severity }}</p>
          <a v-for="(ref, rIndex) in vuln.references" :key="rIndex" :href="ref.url" target="_blank"
            >More Info</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fetchVulnerabilities, Dependency, VulnerabilityResult } from '@/services/osvService'

const file = ref<File | null>(null)
const results = ref<VulnerabilityResult[]>([])
const expandedRow = ref<number | null>(null)

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    file.value = input.files[0]
  }
}

const scanFile = async () => {
  if (!file.value) return

  const reader = new FileReader()
  reader.onload = async () => {
    try {
      const jsonContent = JSON.parse(reader.result as string)
      const dependencies: Dependency[] = Object.entries({
        ...jsonContent.dependencies,
        ...jsonContent.devDependencies,
      }).map(([name, version]) => ({
        name,
        version: version.replace(/^\^|~/, ''),
      }))

      results.value = await fetchVulnerabilities(dependencies)
    } catch (error) {
      console.error('Invalid JSON file', error)
    }
  }

  reader.readAsText(file.value)
}

const toggleDetails = (index: number) => {
  expandedRow.value = expandedRow.value === index ? null : index
}
</script>
