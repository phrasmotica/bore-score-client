import { QueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "react-semantic-toasts"

import { FetchError, acceptGroupInvitation, postGroupMembership } from "./FetchHelpers"

import { Group } from "./models/Group"
import { GroupMembership } from "./models/GroupMembership"

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
