import { userManager } from "./index"

import { Approval } from "./models/Approval"
import { Game } from "./models/Game"
import { Group, GroupResponse } from "./models/Group"
import { GroupInvitation, GroupMembership } from "./models/GroupMembership"
import { Leaderboard } from "./models/Leaderboard"
import { LinkType } from "./models/LinkType"
import { Player } from "./models/Player"
import { Result, ResultResponse } from "./models/Result"
import { Summary } from "./models/Summary"
import { CreateUserRequest, User } from "./models/User"
import { WinMethod } from "./models/WinMethod"

// https://dev.to/snigdho611/react-js-interceptors-with-fetch-api-1oei
const { fetch: originalFetch } = window

window.fetch = async (...args) => {
    let [resource, config] = args

    const addHeaders = resource.toString().includes(process.env.REACT_APP_API_URL || "")

    if (addHeaders) {
        if (!config) {
            config = {} as RequestInit
        }

        let headers = new Headers()

        let user = await userManager.getUser()
        let token = user?.access_token
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }

        if (["POST", "PUT"].includes(config.method || "")) {
            headers.set("Content-Type", "application/json")
        }

        config.headers = headers
    }

    const response = await originalFetch(resource, config)

    return response
}

export const getSummary = async () => {
    return fetch(`${process.env.REACT_APP_API_URL}/summary`)
    .then(handleResponse)
    .then((data: Summary) => data)
}

export const getApprovals = async (resultId: string) => {
    return fetch(`${process.env.REACT_APP_API_URL}/approvals/${resultId}`)
    .then(handleResponse)
    .then((data: Approval[]) => data)
}

export const postApproval = async (approval: Approval) => {
    return fetch(`${process.env.REACT_APP_API_URL}/approvals`, {
        method: "POST",
        body: JSON.stringify(approval),
    })
    .then(handleResponse)
    .then((data: Approval) => data)
}

export const getPlayers = async (groupId?: string) => {
    let url = `${process.env.REACT_APP_API_URL}/players`
    if (groupId) {
        url = `${process.env.REACT_APP_API_URL}/groups/${groupId}/players`
    }

    return fetch(url)
    .then(handleResponse)
    .then((data: Player[]) => data)
}

export const getPlayer = async (username: string) => {
    return fetch(`${process.env.REACT_APP_API_URL}/players/${username}`)
    .then(handleResponse)
    .then((data: Player) => data)
}

export const deletePlayer = async (username: string) => {
    return fetch(`${process.env.REACT_APP_API_URL}/players/${username}`, {
        method: "DELETE",
    })
    .then(handleResponseEmpty)
}

export const postPlayer = async (player: Player) => {
    return fetch(`${process.env.REACT_APP_API_URL}/players`, {
        method: "POST",
        body: JSON.stringify(player),
    })
    .then(handleResponse)
    .then((data: Player) => data)
}

export const updatePlayer = async (player: Player) => {
    return fetch(`${process.env.REACT_APP_API_URL}/players/${player.username}`, {
        method: "PUT",
        body: JSON.stringify(player),
    })
    .then(handleResponseEmpty)
}

export const getGames = async () => {
    return fetch(`${process.env.REACT_APP_API_URL}/games`)
    .then(handleResponse)
    .then((data: Game[]) => data)
}

export const getGame = async (id: string) => {
    return fetch(`${process.env.REACT_APP_API_URL}/games/${id}`)
    .then(handleResponse)
    .then((data: Game) => data)
}

export const postGame = async (game: Game) => {
    return fetch(`${process.env.REACT_APP_API_URL}/games`, {
        method: "POST",
        body: JSON.stringify(game),
    })
    .then(handleResponse)
    .then((data: Game) => data)
}

export const deleteGame = async (id: string) => {
    // TODO: handle error without parsing response as JSON
    return fetch(`${process.env.REACT_APP_API_URL}/games/${id}`, {
        method: "DELETE",
    })
}

export const getGroups = async (getAll?: boolean) => {
    let url = `${process.env.REACT_APP_API_URL}/groups`
    if (getAll) {
        url += "?all=1"
    }

    return fetch(url)
    .then(handleResponse)
    .then((data: GroupResponse[]) => data)
}

export const getGroup = async (id: string) => {
    return fetch(`${process.env.REACT_APP_API_URL}/groups/${id}`)
    .then(handleResponse)
    .then((data: GroupResponse) => data)
}

export const postGroup = async (group: Group) => {
    return fetch(`${process.env.REACT_APP_API_URL}/groups`, {
        method: "POST",
        body: JSON.stringify(group),
    })
    .then(handleResponse)
    .then((data: Group) => data)
}

export const getGroupInvitations = async (username: string) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/${username}/invitations`)
    .then(handleResponse)
    .then((data: GroupInvitation[]) => data)
}

export const acceptGroupInvitation = async (invitationId: string) => {
    return fetch(`${process.env.REACT_APP_API_URL}/invitations/${invitationId}/accept`, {
        method: "POST",
    })
    .then(handleResponseEmpty)
}

export const declineGroupInvitation = async (invitationId: string) => {
    return fetch(`${process.env.REACT_APP_API_URL}/invitations/${invitationId}/decline`, {
        method: "POST",
    })
    .then(handleResponseEmpty)
}

export const postGroupInvitation = async (invitation: GroupInvitation) => {
    return fetch(`${process.env.REACT_APP_API_URL}/invitations`, {
        method: "POST",
        body: JSON.stringify(invitation),
    })
    .then(handleResponse)
    .then((data: GroupInvitation) => data)
}

export const getGroupMemberships = async (username: string) => {
    return fetch(`${process.env.REACT_APP_API_URL}/memberships/${username}`)
    .then(handleResponse)
    .then((data: GroupMembership[]) => data)
}

export const postGroupMembership = async (membership: GroupMembership) => {
    return fetch(`${process.env.REACT_APP_API_URL}/memberships`, {
        method: "POST",
        body: JSON.stringify(membership),
    })
    .then(handleResponse)
    .then((data: GroupMembership) => data)
}

export const getLeaderboardForGroupAndGame = async (groupId: string, gameId: string) => {
    let url = `${process.env.REACT_APP_API_URL}/groups/${groupId}/leaderboard/${gameId}`

    return fetch(url)
    .then(handleResponse)
    .then((data: Leaderboard) => data)
}

export const getLinkTypes = async () => {
    return fetch(`${process.env.REACT_APP_API_URL}/linkTypes`)
    .then(handleResponse)
    .then((data: LinkType[]) => data)
}

export const getUser = async (username: string) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/${username}`)
    .then(handleResponse)
    .then((data: User) => data)
}

export const postUser = async (user: CreateUserRequest) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "POST",
        body: JSON.stringify(user),
    })
    .then(handleResponseEmpty)
}

export const updatePassword = async (request: UpdatePasswordRequest) => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/${request.username}/password`, {
        method: "PUT",
        body: JSON.stringify(request),
    })
    .then(handleResponseEmpty)
}

export const getWinMethods = async () => {
    return fetch(`${process.env.REACT_APP_API_URL}/winMethods`)
    .then(handleResponse)
    .then((data: WinMethod[]) => data)
}

export const getResults = async () => {
    return fetch(`${process.env.REACT_APP_API_URL}/results`)
    .then(handleResponse)
    .then((data: ResultResponse[]) => data)
}

export const getResultsForGroup = async (groupId: string) => {
    let url = `${process.env.REACT_APP_API_URL}/groups/${groupId}/results`

    return fetch(url)
    .then(handleResponse)
    .then((data: ResultResponse[]) => data)
}

export const getResultsForUser = async (username: string) => {
    let url = `${process.env.REACT_APP_API_URL}/users/${username}/results`

    return fetch(url)
    .then(handleResponse)
    .then((data: ResultResponse[]) => data)
}

export const postResult = async (result: Result) => {
    return fetch(`${process.env.REACT_APP_API_URL}/results`, {
        method: "POST",
        body: JSON.stringify(result),
    })
    .then(handleResponse)
    .then((data: Result) => data)
}

export const requestToken = async (request: TokenRequest) => {
    return fetch(`${process.env.REACT_APP_API_URL}/token`, {
        method: "POST",
        body: JSON.stringify(request),
    })
    .then(res => res.json())
    .then((res: TokenResponse) => res)
}

export const refreshToken = async (request: TokenRefreshRequest) => {
    // don't make a recursive call to the amended fetch
    return originalFetch(`${process.env.REACT_APP_API_URL}/token/refresh`, {
        method: "POST",
        body: JSON.stringify(request),
    })
    .then(res => res.json())
    .then((res: TokenResponse) => res)
}

const handleResponseEmpty = (res: Response) => {
    if (!res.ok) {
        throw new FetchError(res, `Response from ${res.url} returned error ${res.status} (${res.statusText})`)
    }
}

const handleResponse = (res: Response) => {
    if (res.ok) {
        return res.json()
    }

    throw new FetchError(res, `Response from ${res.url} returned error ${res.status} (${res.statusText})`)
}

interface UpdatePasswordRequest {
    username: string
    currentPassword: string
    newPassword: string
}

interface TokenRequest {
    email: string
    password: string
}

export interface TokenResponse {
    token: string
}

interface TokenRefreshRequest {
    token: string
}

export class FetchError extends Error {
    constructor(public response: Response, message?: string) {
        super(message)
    }

    isUnauthorised() {
        return this.response.status === 401
    }

    isNotFound() {
        return this.response.status === 404
    }
}
