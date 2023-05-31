import moment from "moment"

import { getHeaders, getToken, parseToken, removeToken, setToken } from "./Auth"

import { Approval } from "./models/Approval"
import { Game } from "./models/Game"
import { Group, GroupResponse } from "./models/Group"
import { GroupInvitation, GroupMembership } from "./models/GroupMembership"
import { LinkType } from "./models/LinkType"
import { Player } from "./models/Player"
import { Result, ResultResponse } from "./models/Result"
import { Summary } from "./models/Summary"
import { User, CreateUserRequest } from "./models/User"
import { WinMethod } from "./models/WinMethod"
import { Leaderboard } from "./models/Leaderboard"

// https://dev.to/snigdho611/react-js-interceptors-with-fetch-api-1oei
const { fetch: originalFetch } = window

window.fetch = async (...args) => {
    let [resource, config] = args

    // TODO: currently every request will do this. Do it only once, possibly
    // with react-query or react-query-auth library?
    const parsedToken = parseToken()
    if (parsedToken) {
        const expiryTime = moment.unix(parsedToken.exp)
        const now = moment()
        const secondsLeft = expiryTime.diff(now, "seconds")

        if (secondsLeft <= 0) {
            removeToken()
        }
        else if (secondsLeft < 30) {
            console.log("Refreshing token, only %d seconds left", secondsLeft)
            const token = getToken()
            const tokenRes = await refreshToken({ token })
            setToken(tokenRes.token)
        }
    }

    const response = await originalFetch(resource, config)

    return response
}

export const getSummary = () => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/summary`, {
        headers: headers,
    })
    .then(handleResponse)
    .then((data: Summary) => data)
}

export const getApprovals = (resultId: string) => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/approvals/${resultId}`, {
        headers: headers,
    })
    .then(handleResponse)
    .then((data: Approval[]) => data)
}

export const postApproval = (approval: Approval) => {
    const headers = getHeaders()
    headers.set("Content-Type", "application/json")

    return fetch(`${process.env.REACT_APP_API_URL}/approvals`, {
        method: "POST",
        body: JSON.stringify(approval),
        headers: headers,
    })
    .then(handleResponse)
    .then((data: Approval) => data)
}

export const getPlayers = (groupId?: string) => {
    const headers = getHeaders()

    let url = `${process.env.REACT_APP_API_URL}/players`
    if (groupId) {
        url = `${process.env.REACT_APP_API_URL}/groups/${groupId}/players`
    }

    return fetch(url, {
        headers: headers,
    })
    .then(handleResponse)
    .then((data: Player[]) => data)
}

export const getPlayer = (username: string) => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/players/${username}`, {
        headers: headers,
    })
    .then(handleResponse)
    .then((data: Player) => data)
}

export const deletePlayer = (username: string) => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/players/${username}`, {
        method: "DELETE",
        headers: headers,
    })
    .then(handleResponseEmpty)
}

export const postPlayer = (player: Player) => {
    const headers = getHeaders()
    headers.set("Content-Type", "application/json")

    return fetch(`${process.env.REACT_APP_API_URL}/players`, {
        method: "POST",
        body: JSON.stringify(player),
        headers: headers,
    })
    .then(handleResponse)
    .then((data: Player) => data)
}

export const updatePlayer = (player: Player) => {
    const headers = getHeaders()
    headers.set("Content-Type", "application/json")

    return fetch(`${process.env.REACT_APP_API_URL}/players/${player.username}`, {
        method: "PUT",
        body: JSON.stringify(player),
        headers: headers,
    })
    .then(handleResponseEmpty)
}

export const getGames = () => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/games`, {
        headers: headers,
    })
    .then(handleResponse)
    .then((data: Game[]) => data)
}

export const getGame = (id: string) => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/games/${id}`, {
        headers: headers,
    })
    .then(handleResponse)
    .then((data: Game) => data)
}

export const postGame = (game: Game) => {
    const headers = getHeaders()
    headers.set("Content-Type", "application/json")

    return fetch(`${process.env.REACT_APP_API_URL}/games`, {
        method: "POST",
        body: JSON.stringify(game),
        headers: headers,
    })
    .then(handleResponse)
    .then((data: Game) => data)
}

export const deleteGame = (id: string) => {
    const headers = getHeaders()

    // TODO: handle error without parsing response as JSON
    return fetch(`${process.env.REACT_APP_API_URL}/games/${id}`, {
        method: "DELETE",
        headers: headers,
    })
}

export const getGroups = (getAll?: boolean) => {
    const headers = getHeaders()

    let url = `${process.env.REACT_APP_API_URL}/groups`
    if (getAll) {
        url += "?all=1"
    }

    return fetch(url, {
        headers: headers,
    })
    .then(handleResponse)
    .then((data: GroupResponse[]) => data)
}

export const getGroup = (id: string) => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/groups/${id}`, {
        headers: headers,
    })
    .then(handleResponse)
    .then((data: GroupResponse) => data)
}

export const postGroup = (group: Group) => {
    const headers = getHeaders()
    headers.set("Content-Type", "application/json")

    return fetch(`${process.env.REACT_APP_API_URL}/groups`, {
        method: "POST",
        body: JSON.stringify(group),
        headers: headers,
    })
    .then(handleResponse)
    .then((data: Group) => data)
}

export const getGroupInvitations = (username: string) => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/users/${username}/invitations`, {
        headers: headers,
    })
    .then(handleResponse)
    .then((data: GroupInvitation[]) => data)
}

export const acceptGroupInvitation = (invitationId: string) => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/invitations/${invitationId}/accept`, {
        method: "POST",
        headers: headers,
    })
    .then(handleResponseEmpty)
}

export const declineGroupInvitation = (invitationId: string) => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/invitations/${invitationId}/decline`, {
        method: "POST",
        headers: headers,
    })
    .then(handleResponseEmpty)
}

export const postGroupInvitation = (invitation: GroupInvitation) => {
    const headers = getHeaders()
    headers.set("Content-Type", "application/json")

    return fetch(`${process.env.REACT_APP_API_URL}/invitations`, {
        method: "POST",
        body: JSON.stringify(invitation),
        headers: headers,
    })
    .then(handleResponse)
    .then((data: GroupInvitation) => data)
}

export const getGroupMemberships = (username: string) => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/memberships/${username}`, {
        headers: headers,
    })
    .then(handleResponse)
    .then((data: GroupMembership[]) => data)
}

export const postGroupMembership = (membership: GroupMembership) => {
    const headers = getHeaders()
    headers.set("Content-Type", "application/json")

    return fetch(`${process.env.REACT_APP_API_URL}/memberships`, {
        method: "POST",
        body: JSON.stringify(membership),
        headers: headers,
    })
    .then(handleResponse)
    .then((data: GroupMembership) => data)
}

export const getLeaderboardForGroupAndGame = (groupId: string, gameId: string) => {
    let url = `${process.env.REACT_APP_API_URL}/groups/${groupId}/leaderboard/${gameId}`

    return fetch(url, {
        headers: getHeaders(),
    })
    .then(handleResponse)
    .then((data: Leaderboard) => data)
}

export const getLinkTypes = () => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/linkTypes`, {
        headers: headers,
    })
    .then(handleResponse)
    .then((data: LinkType[]) => data)
}

export const getUser = (username: string) => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/users/${username}`, {
        headers: headers,
    })
    .then(handleResponse)
    .then((data: User) => data)
}

export const postUser = (user: CreateUserRequest) => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: headers,
    })
    .then(handleResponseEmpty)
}

export const updatePassword = (request: UpdatePasswordRequest) => {
    const headers = getHeaders()
    headers.set("Content-Type", "application/json")

    return fetch(`${process.env.REACT_APP_API_URL}/users/${request.username}/password`, {
        method: "PUT",
        body: JSON.stringify(request),
        headers: headers,
    })
    .then(handleResponseEmpty)
}

export const getWinMethods = () => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/winMethods`, {
        headers: headers,
    })
    .then(handleResponse)
    .then((data: WinMethod[]) => data)
}

export const getResults = () => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/results`, {
        headers: headers,
    })
    .then(handleResponse)
    .then((data: ResultResponse[]) => data)
}

export const getResultsForGroup = (groupId: string) => {
    let url = `${process.env.REACT_APP_API_URL}/groups/${groupId}/results`

    return fetch(url, {
        headers: getHeaders(),
    })
    .then(handleResponse)
    .then((data: ResultResponse[]) => data)
}

export const getResultsForUser = (username: string) => {
    let url = `${process.env.REACT_APP_API_URL}/users/${username}/results`

    return fetch(url, {
        headers: getHeaders(),
    })
    .then(handleResponse)
    .then((data: ResultResponse[]) => data)
}

export const postResult = (result: Result) => {
    const headers = getHeaders()
    headers.set("Content-Type", "application/json")

    return fetch(`${process.env.REACT_APP_API_URL}/results`, {
        method: "POST",
        body: JSON.stringify(result),
        headers: headers,
    })
    .then(handleResponse)
    .then((data: Result) => data)
}

export const requestToken = (request: TokenRequest) => {
    const headers = getHeaders()
    headers.set("Content-Type", "application/json")

    return fetch(`${process.env.REACT_APP_API_URL}/token`, {
        method: "POST",
        body: JSON.stringify(request),
        headers: headers,
    })
    .then(res => res.json())
    .then((res: TokenResponse) => res)
}

export const refreshToken = (request: TokenRefreshRequest) => {
    const headers = getHeaders()
    headers.set("Content-Type", "application/json")

    // don't make a recursive call to the amended fetch
    return originalFetch(`${process.env.REACT_APP_API_URL}/token/refresh`, {
        method: "POST",
        body: JSON.stringify(request),
        headers: headers,
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
