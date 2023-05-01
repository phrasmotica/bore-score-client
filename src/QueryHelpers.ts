import { useQuery } from "@tanstack/react-query"

import { getApprovals, getGames, getGroups, getPlayers, getResults } from "./FetchHelpers"

// TODO: add error handling
export const useApprovals = (resultId: string, enabled: boolean) => useQuery({
    queryKey: ["approvals", resultId],
    queryFn: () => getApprovals(resultId),
    enabled: enabled,
})

// TODO: add error handling
export const useGames = () => useQuery({
    queryKey: ["games"],
    queryFn: () => getGames(),
})

// TODO: add error handling
export const useGroups = () => useQuery({
    queryKey: ["groups"],
    queryFn: () => getGroups(),
})

// TODO: add error handling
export const usePlayers = () => useQuery({
    queryKey: ["players"],
    queryFn: () => getPlayers(),
})

// TODO: add error handling
export const useResults = (username?: string) => {
    let key = ["results"]
    if (username) {
        key.push(username)
    }

    return useQuery({
        queryKey: key,
        queryFn: () => getResults(username),
    })
}
