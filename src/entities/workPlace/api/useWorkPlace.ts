import type { WorkPlace } from "@/entities/workPlace/api/types";
import useFetch from "@/shared/lib/hooks/useFetch";
import { useCallback, useEffect } from "react";

export const useWorkPlaces = () => {
  const { data, error, loading, execute } = useFetch<WorkPlace[]>();

  const executeWorkPlaces = useCallback(async () => {
	if (data) return;
    try {
      await execute("https://dummyjson.com/products/category-list");
    } catch (err) {
      console.error(err);
    }
  }, [execute]);

  useEffect(() => {
    executeWorkPlaces();
  }, [executeWorkPlaces]);

  return { data, error, loading };
};
