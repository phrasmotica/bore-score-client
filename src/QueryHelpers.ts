import { useQuery } from "@tanstack/react-query"

import { FetchError, getApprovals, getGame, getGames, getGroup, getGroupInvitations, getGroupMemberships, getGroups, getLeaderboardForGroupAndGame, getLinkTypes, getPlayer, getPlayers, getResults, getResultsForGroup, getResultsForUser, getSummary, getUser, getWinMethods } from "./FetchHelpers"
import { ResultResponse } from "./models/Result"
import { Leaderboard } from "./models/Leaderboard"

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

export const useGame = (name: string, onError?: (error: FetchError) => void) => useQuery({
    queryKey: ["game", name],
    queryFn: () => getGame(name),
    onError,
    retry: shouldRetry,
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

export const useGroup = (id: string, onError?: (error: FetchError) => void) => useQuery({
    queryKey: ["group", id],
    queryFn: () => getGroup(id),
    onError,
    retry: shouldRetry,
})

// TODO: add error handling
export const useGroupInvitations = (username: string) => useQuery({
    queryKey: ["groupInvitations", username],
    queryFn: () => getGroupInvitations(username),
    enabled: username.length > 0,
})

// TODO: add error handling
export const useGroupMemberships = (username: string) => useQuery({
    queryKey: ["groupMemberships", username],
    queryFn: () => getGroupMemberships(username),
    enabled: username.length > 0,
})

export const useLeaderboardForGroupAndGame = (
    groupId: string,
    gameId: string,
    onSuccess?: (data: Leaderboard) => void,
    onError?: (error: FetchError) => void
) => useQuery({
    queryKey: ["leaderboard", `groupId:${groupId}`, `gameId:${gameId}`],
    queryFn: () => getLeaderboardForGroupAndGame(groupId, gameId),
    onSuccess,
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
export const usePlayers = (groupId?: string) => {
    let key = ["players"]
    if (groupId) {
        key.push(`groupId:${groupId}`)
    }

    return useQuery({
        queryKey: key,
        queryFn: () => getPlayers(groupId),
    })
}

// TODO: add error handling
export const usePlayer = (username: string, onError?: (error: FetchError) => void) => useQuery({
    queryKey: ["player", username],
    queryFn: () => getPlayer(username),
    onError,
    retry: shouldRetry,
})

export const useResults = (onError?: (error: FetchError) => void) => {
    return useQuery({
        queryKey: ["results"],
        queryFn: getResults,
        onError,
        retry: shouldRetry,
    })
}

export const useResultsForGroup = (
    groupId: string,
    onSuccess?: (data: ResultResponse[]) => void,
    onError?: (error: FetchError) => void
) => useQuery({
    queryKey: ["results", `groupId:${groupId}`],
    queryFn: () => getResultsForGroup(groupId),
    onSuccess,
    onError,
    retry: shouldRetry,
})

export const useResultsForUser = (username: string, onError?: (error: FetchError) => void) => useQuery({
    queryKey: ["results", `username:${username}`],
    queryFn: () => getResultsForUser(username),
    onError,
    retry: shouldRetry,
})

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

const shouldRetry = (failureCount: number, error: FetchError) => {
    return ![401, 404].includes(error.response.status)
}
