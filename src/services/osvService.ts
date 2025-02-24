import axios from "axios";

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

const API_URL = "api/v1/query";

export const fetchVulnerabilities = async (dependencies: Dependency[]): Promise<VulnerabilityResult[]> => {
  try {
    const results = await Promise.all(
      dependencies.map(async (dep) => {
        const response = await axios.post(API_URL, {
          package: { name: dep.name, ecosystem: "npm" },
          version: dep.version,
        });

        return {
          package: dep.name,
          vulnerabilities: response.data.vulns || [],
        };
      })
    );

    return results;
  } catch (error) {
    console.error("Error fetching vulnerabilities:", error);
    return [];
  }
};
