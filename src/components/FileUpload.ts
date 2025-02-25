import { ref } from 'vue';
import { useScanService } from '@/services/osvService'; // Import the scan service

export function useFileUpload(emit: (event: "fileSelected" | "scanCompleted", payload: unknown) => void) {
  const file = ref<File | null>(null);
  const { results, isScanning, scanComplete, fetchVulnerabilities } = useScanService(); // Use scan service

  const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      file.value = input.files[0];
      emit('fileSelected', file.value); // Emit the file selection event
    }
  };

  const scanFile = async () => {
    if (!file.value) return;

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const jsonContent = JSON.parse(reader.result as string);

        // Extract dependencies
        const dependencies = Object.entries({
          ...jsonContent.dependencies,
          ...jsonContent.devDependencies,
        }).map(([name, version]) => ({
          name,
          version: (version as string).replace(/^\^|~/, ''),
        }));

        // Fetch vulnerabilities using the service
        const scanResults = await fetchVulnerabilities(dependencies);
        emit('scanCompleted', scanResults); // Emit the scan results to the parent
      } catch (error) {
        console.error('Invalid JSON file:', error);
      }
    };

    reader.readAsText(file.value);
  };

  return {
    file,
    isScanning,
    results,
    handleFileUpload,
    scanFile,
    scanComplete
  };
}
