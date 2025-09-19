import { useState, useCallback } from "react";

type FetchState<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
};

const cache: Record<string, unknown> = {};

export const useFetch = <T = unknown>() => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const execute = useCallback(async (url: string, options?: RequestInit) => {
    if (cache[url]) {
      setState({ data: cache[url] as T, error: null, loading: false });
      return cache[url];
    }

    setState({ data: null, error: null, loading: true });
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      cache[url] = data;
      setState({ data, error: null, loading: false });
      return data;
    } catch (error: unknown) {
      setState({
        data: null,
        error: error as Error,
        loading: false,
      });
      throw error;
    }
  }, []);

  return { ...state, execute };
};

export default useFetch;
