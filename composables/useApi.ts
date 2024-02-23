export function useApi<T>() {
  const data = useState<T | null>('data', () => null);
  const loading = useState<boolean>('loading', () => false);
  const error = useState<string | null>('error', () => null);

  async function fetchData(endpoint: string): Promise<void> {
    try {
      loading.value = true;
      error.value = null;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      data.value = await response.json();
    } catch (err) {
      const errorMessage = (err as Error).message; // Casting 'err' to 'Error'
      console.error('Error fetching data:', errorMessage);
      error.value = errorMessage;
    } finally {
      loading.value = false;
    }
  }

  return { fetchData, data, loading, error };
}
