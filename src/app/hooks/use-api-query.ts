import { type ErrorResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useApiQuery<InputT, OutputT>({
  payload,
  apiHandler,
  queryKey,
  enabled = true,
}: {
  payload: InputT | never;
  apiHandler: (payloadData: InputT | never) => Promise<OutputT>;
  queryKey: unknown[];
  enabled?: boolean;
}) {
  return useQuery<OutputT, ErrorResponse>({
    queryKey,
    queryFn: () => apiHandler(payload),
    enabled,
  });
}
