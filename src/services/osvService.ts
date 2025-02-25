import axios from 'axios';
import { ref } from 'vue';

export interface Dependency {
  name: string;
  version: string;
}

export interface Vulnerability {
  id: string;
  severity: string;
  summary: string;
  references: { url: string }[];
}

export interface VulnerabilityResult {
  package: string;
  vulnerabilities: Vulnerability[];
}

const API_URL = '/api/v1/query';

export function useScanService() {
  const results = ref<VulnerabilityResult[]>([]);
  const isScanning = ref(false);

  // Fetch vulnerabilities for a given list of dependencies
  const fetchVulnerabilities = async (dependencies: Dependency[]): Promise<VulnerabilityResult[]> => {
    if (!dependencies.length) return [];

    isScanning.value = true;

    try {
      const requests = dependencies.map((dep) =>
        axios
          .post(API_URL, {
            package: { name: dep.name, ecosystem: 'npm' },
            version: dep.version,
          })
          .then((response) => ({
            package: dep.name,
            vulnerabilities: response.data.vulns || [],
          }))
          .catch((error) => {
            console.error(`Error fetching vulnerabilities for ${dep.name}:`, error);
            return { package: dep.name, vulnerabilities: [] }; // Return empty vulnerabilities if the request fails
          })
      );

      results.value = await Promise.all(requests);
      return results.value;
    } catch (error) {
      console.error('Error fetching vulnerabilities:', error);
      return [];
    } finally {
      isScanning.value = false;
    }
  };

  return {
    results,
    isScanning,
    fetchVulnerabilities,
  };
}
