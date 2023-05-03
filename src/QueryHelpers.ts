import { useQuery } from "@tanstack/react-query"

import { getApprovals, getGame, getGames, getGroup, getGroups, getLinkTypes, getPlayer, getPlayers, getResults, getSummary, getUser, getWinMethods } from "./FetchHelpers"

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
export const useGroups = (getAll?: boolean) => {
    let key = ["groups"]
    if (getAll) {
        key.push("all")
    }

    return useQuery({
        queryKey: key,
        queryFn: () => getGroups(getAll),
    })
}

export const useGroup = (name: string, onError: (error: Error) => void) => useQuery({
    queryKey: ["group", name],
    queryFn: () => getGroup(name),
    onError,
    retry: shouldRetry,
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
export const usePlayers = (group?: string) => {
    let key = ["players"]
    if (group) {
        key.push(`group:${group}`)
    }

    return useQuery({
        queryKey: key,
        queryFn: () => getPlayers(group),
    })
}

// TODO: add error handling
export const usePlayer = (username: string) => useQuery({
    queryKey: ["player", username],
    queryFn: () => getPlayer(username),
})

// TODO: add error handling
export const useResults = (options?: {
    username?: string, group?: string
}) => {
    let key = ["results"]
    if (options?.username) {
        key.push(`username:${options.username}`)
    }

    if (options?.group) {
        key.push(`group:${options?.group}`)
    }

    return useQuery({
        queryKey: key,
        queryFn: () => getResults(options),
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

const shouldRetry = (failureCount: number, error: Error) => {
    return error.message !== "unauthorised"
}
