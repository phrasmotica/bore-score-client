import { useQuery } from "@tanstack/react-query"

import { getAllGroups, getApprovals, getGame, getGames, getGroup, getGroups, getLinkTypes, getPlayer, getPlayers, getResults, getSummary, getUser, getWinMethods } from "./FetchHelpers"

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
export const useGame = (name: string) => useQuery({
    queryKey: ["game", name],
    queryFn: () => getGame(name),
})

// TODO: add error handling
export const useAllGroups = () => useQuery({
    queryKey: ["groups-all"],
    queryFn: () => getAllGroups(),
})

// TODO: add error handling
export const useGroups = () => useQuery({
    queryKey: ["groups"],
    queryFn: () => getGroups(),
})

// TODO: add error handling
export const useGroup = (name: string) => useQuery({
    queryKey: ["group", name],
    queryFn: () => getGroup(name),
})

// TODO: add error handling
export const useLinkTypes = () => useQuery({
    queryKey: ["linkTypes"],
    queryFn: () => getLinkTypes(),
})

// TODO: add error handling
export const useSummary = () => useQuery({
    queryKey: ["summary"],
    queryFn: () => getSummary(),
})

// TODO: add error handling
export const usePlayers = () => useQuery({
    queryKey: ["players"],
    queryFn: () => getPlayers(),
})

// TODO: add error handling
export const usePlayer = (username: string) => useQuery({
    queryKey: ["player", username],
    queryFn: () => getPlayer(username),
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

// TODO: add error handling
export const useUser = (username: string) => useQuery({
    queryKey: ["user", username],
    queryFn: () => getUser(username),
})

// TODO: add error handling
export const useWinMethods = () => useQuery({
    queryKey: ["winMethods"],
    queryFn: () => getWinMethods(),
})
