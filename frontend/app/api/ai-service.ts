import { useQuery } from "@tanstack/react-query";
import { apiGet } from "./axios-client";

const DEFAULT_QUERY_OPTIONS = {
  retry: 1,
  refetchOnWindowFocus: false,
};

const basePath = "/api/ai";

export const useGetAiConservatipn = (query = {}) => {
  return useQuery({
    ...DEFAULT_QUERY_OPTIONS,
    queryKey: ["get ai content", query],
    queryFn: async () => {
      return await apiGet(`${basePath}`, query);
    },
  });
};

