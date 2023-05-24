import { QueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "react-semantic-toasts"

import { FetchError, TokenResponse, acceptGroupInvitation, declineGroupInvitation, postGroupInvitation, postGroupMembership, postUser, requestToken } from "./FetchHelpers"

import { Group } from "./models/Group"
import { GroupInvitation, GroupMembership } from "./models/GroupMembership"
import { User } from "./models/User"

// TODO: add error handling
export const useSignup = (onSuccess: (data: User) => void) => useMutation({
    mutationFn: postUser,
    onSuccess,
})

// TODO: add error handling
export const useLogin = (onSuccess: (data: TokenResponse) => void) => useMutation({
    mutationFn: requestToken,
    onSuccess,
})

export const useAddGroupMembership = (queryClient: QueryClient, group: Group, username: string) => useMutation({
    mutationFn: postGroupMembership,
    onSuccess(data: GroupMembership) {
        queryClient.invalidateQueries({
            queryKey: ["groupMemberships", username],
        })

        queryClient.invalidateQueries({
            queryKey: ["players", `groupId:${group.id}`],
        })

        toast({
            title: "",
            description: `You joined ${group.displayName}!`,
            color: "green",
            icon: "users",
        })
    },
    onError(error: Error, variables, context) {
        toast({
            title: "",
            description: `Failed to join ${group.displayName}.`,
            color: "red",
            icon: "users",
        })
    },
})

export const useAddGroupInvitation = (
    queryClient: QueryClient,
    onSuccess: (data: GroupInvitation) => void,
    onError: (error: FetchError, variables: GroupInvitation) => void) => useMutation({
    mutationFn: postGroupInvitation,
    onSuccess(data: GroupInvitation) {
        queryClient.invalidateQueries({
            queryKey: ["groupInvitations", data.username],
        })

        onSuccess(data)
    },
    onError,
})

export const useAcceptGroupInvitation = (queryClient: QueryClient, group: Group, username: string) => useMutation({
    mutationFn: acceptGroupInvitation,
    onSuccess() {
        queryClient.invalidateQueries({
            predicate: query => query.queryKey.includes("groupInvitations"),
        })

        queryClient.invalidateQueries({
            queryKey: ["groupMemberships", username],
        })

        queryClient.invalidateQueries({
            queryKey: ["players", `groupId:${group.id}`],
        })

        queryClient.invalidateQueries({
            queryKey: ["results", `groupId:${group.id}`],
        })

        toast({
            title: "",
            description: `You joined ${group.displayName}!`,
            color: "green",
            icon: "users",
        })
    },
    onError(error: FetchError, variables, context) {
        toast({
            title: "",
            description: `Failed to join ${group.displayName}.`,
            color: "red",
            icon: "users",
        })
    },
})

export const useDeclineGroupInvitation = (queryClient: QueryClient, group: Group) => useMutation({
    mutationFn: declineGroupInvitation,
    onSuccess() {
        queryClient.invalidateQueries({
            predicate: query => query.queryKey.includes("groupInvitations"),
        })

        toast({
            title: "",
            description: `You declined the invitation to join ${group.displayName}.`,
            color: "green", // TODO: negative action, make this a different colour?
            icon: "users",
        })
    },
    onError(error: FetchError, variables, context) {
        toast({
            title: "",
            description: `Failed to decline the invitation to join ${group.displayName}.`,
            color: "red",
            icon: "users",
        })
    },
})
