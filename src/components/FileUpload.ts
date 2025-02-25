import { ref } from "vue";


interface Dependency {
  name: string;
  version: string;
}

interface Vulnerability {
  id: string;
  severity: string;
  summary: string;
  references: { url: string }[];
}

interface VulnerabilityResult {
  package: string;
  vulnerabilities: Vulnerability[];
}

export function useFileUpload() {
  const file = ref<File | null>(null);
  const dependencies = ref<Dependency[]>([]);
  const results = ref<Array<VulnerabilityResult>>([]);


  const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      file.value = input.files[0];
    }
  };

  const scanFile = async () => {
    if (!file.value) return;

    results.value = [];
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const jsonContent = JSON.parse(reader.result as string);

        // Extract dependencies
        dependencies.value = Object.entries({
          ...jsonContent.dependencies,
          ...jsonContent.devDependencies,
        }).map(([name, version]) => ({
          name,
          version: (version as string).replace(/^\^|~/, ""),
        }));
      } catch (error) {
        console.error("Invalid JSON file", error);
      }

      results.value = await Promise.all(
        dependencies.value.map((dep) =>
          fetch("/api/v1/query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              package: { name: dep.name, ecosystem: "npm" },
              version: dep.version,
            }),
          }).then((res) =>
            res.json().then((data) => ({
              package: dep.name,
              vulnerabilities: data.vulns || [],
            }))
          )
        )
      );
      console.log("Vulnerability scan results:", results.value);
    };


    reader.readAsText(file.value);
  };



  return {
    file,
    results,
    handleFileUpload,
    scanFile,


  };
}
