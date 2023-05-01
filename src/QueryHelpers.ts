import { useQuery } from "@tanstack/react-query"
import { getApprovals, getPlayers, getResults } from "./FetchHelpers"

// TODO: add error handling
export const useApprovals = (resultId: string, enabled: boolean) => useQuery({
    queryKey: ["approvals", resultId],
    queryFn: () => getApprovals(resultId),
    enabled: enabled,
})

// TODO: add error handling
export const usePlayers = () => useQuery({
    queryKey: ["players"],
    queryFn: () => getPlayers(),
})

// TODO: add error handling
export const useResults = () => useQuery({
    queryKey: ["results"],
    queryFn: () => getResults(),
})
