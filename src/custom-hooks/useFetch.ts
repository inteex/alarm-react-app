import useAsync from "./useAsync";

const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" },
};

export default function useFetch<T>(
  url: string,
  options?: RequestInit,
  dependencies = []
) {
  return useAsync<T>(() => {
    return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then(
      (res: Response) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      }
    );
  }, dependencies);
}
