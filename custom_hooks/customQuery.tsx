"use client";
import { useQuery } from "@tanstack/react-query";

export const useCustomQuery = (url: string) => {
  const {
    data,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [url], // ✅ ensures cache and refetching is tied to URL
    queryFn: async () => {
      const res = await fetch(url);

      // ✅ handle non-200 errors gracefully
      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.message || "Failed to fetch data");
      }

      return res.json();
    },
  });

  return {
    data,
    isLoading,
    error,
    isError,
    isSuccess,
  };
};
