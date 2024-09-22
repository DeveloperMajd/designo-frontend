export const fetchData = async <T>(url: string): Promise<T | null> => {
  try {
    const res = await fetch(url);
    const json = await res.json();

    return json.data as T;
  } catch (error) {
    console.log("🚀 ~ fetchData ~ error:", error);
    return null;
  }
};
