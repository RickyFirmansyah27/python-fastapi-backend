import { useMutation, useQuery } from "@tanstack/react-query";
import { apiPost } from "./axios-client";

const DEFAULT_QUERY_OPTIONS = {
  retry: 1,
  refetchOnWindowFocus: false,
};

const basePath = "/api/ai";

export const useGetAiConservation = () => {
  return useMutation({
    mutationKey: ["ask-ai"],
    mutationFn: (body: any) => apiPost(basePath, body),
  });
};

