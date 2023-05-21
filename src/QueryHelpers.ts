import { useQuery } from "@tanstack/react-query"

import { PersistentError, getApprovals, getGame, getGames, getGroup, getGroupInvitations, getGroupMemberships, getGroups, getLinkTypes, getPlayer, getPlayers, getResults, getResultsForUser, getSummary, getUser, getWinMethods } from "./FetchHelpers"

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

export const useGame = (name: string, onError?: (error: Error) => void) => useQuery({
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

export const useGroup = (id: string, onError?: (error: Error) => void) => useQuery({
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
export const usePlayer = (username: string, onError?: (error: Error) => void) => useQuery({
    queryKey: ["player", username],
    queryFn: () => getPlayer(username),
    onError,
    retry: shouldRetry,
})

export const useResults = (options?: {
    groupId?: string
}, onError?: (error: Error) => void) => {
    let key = ["results"]

    if (options?.groupId) {
        key.push(`groupId:${options.groupId}`)
    }

    return useQuery({
        queryKey: key,
        queryFn: () => getResults(options),
        onError,
        retry: shouldRetry,
    })
}

export const useResultsForUser = (username: string, onError?: (error: Error) => void) => useQuery({
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

const shouldRetry = (failureCount: number, error: Error) => {
    return !Object.values(PersistentError).includes(error.message as PersistentError)
}
