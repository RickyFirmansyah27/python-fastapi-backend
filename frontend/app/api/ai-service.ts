import { useMutation, useQuery } from "@tanstack/react-query";
import { apiGet } from "./axios-client";

const DEFAULT_QUERY_OPTIONS = {
  retry: 1,
  refetchOnWindowFocus: false,
};

const basePath = "/api/ai";

export const useGetAiConservation = () => {
  return useMutation({
    mutationKey: ["ask-ai"],
    mutationFn: (params: any) => apiGet(basePath, params),
  });
};

