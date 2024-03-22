export async function fetchData<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
