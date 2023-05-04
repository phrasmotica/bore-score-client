import moment from "moment"

import { getHeaders, getToken, parseToken, removeToken, setToken } from "./Auth"

import { Approval } from "./models/Approval"
import { Game } from "./models/Game"
import { Group } from "./models/Group"
import { GroupMembership } from "./models/GroupMembership"
import { LinkType } from "./models/LinkType"
import { Player } from "./models/Player"
import { Result } from "./models/Result"
import { Summary } from "./models/Summary"
import { User } from "./models/User"
import { WinMethod } from "./models/WinMethod"

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

export enum PersistentError {
    Unauthorised = "unauthorised",
    NotFound = "not found",
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

export const getPlayers = (group?: string) => {
    const headers = getHeaders()

    let url = `${process.env.REACT_APP_API_URL}/players`
    if (group) {
        url += `?group=${group}`
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
    .then(handleNotFoundResponse)
    .then(handleResponse)
    .then((data: Player) => data)
}

export const deletePlayer = (username: string) => {
    const headers = getHeaders()

    // TODO: handle error without parsing response as JSON
    return fetch(`${process.env.REACT_APP_API_URL}/players/${username}`, {
        method: "DELETE",
        headers: headers,
    })
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

export const getGames = () => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/games`, {
        headers: headers,
    })
    .then(handleResponse)
    .then((data: Game[]) => data)
}

export const getGame = (name: string) => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/games/${name}`, {
        headers: headers,
    })
    .then(handleNotFoundResponse)
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

export const deleteGame = (name: string) => {
    const headers = getHeaders()

    // TODO: handle error without parsing response as JSON
    return fetch(`${process.env.REACT_APP_API_URL}/games/${name}`, {
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
    .then((data: Group[]) => data)
}

export const getGroup = (name: string) => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/groups/${name}`, {
        headers: headers,
    })
    .then(handleUnauthorisedResponse)
    .then(handleNotFoundResponse)
    .then(handleResponse)
    .then((data: Group) => data)
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

export const getWinMethods = () => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/winMethods`, {
        headers: headers,
    })
    .then(handleResponse)
    .then((data: WinMethod[]) => data)
}

export const getResults = (options?: {
    username?: string, group?: string
}) => {
    let url = `${process.env.REACT_APP_API_URL}/results`

    // API currently allows only one or the other
    if (options?.username) {
        url += `?username=${options.username}`
    }
    else if (options?.group) {
        url += `?group=${options.group}`
    }

    return fetch(url, {
        headers: getHeaders(),
    })
    .then(handleResponse)
    .then((data: Result[]) => data)
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

const handleUnauthorisedResponse = (res: Response) => {
    if (res.status === 401) {
        throw new Error(PersistentError.Unauthorised)
    }

    return res
}

const handleNotFoundResponse = (res: Response) => {
    if (res.status === 404) {
        throw new Error(PersistentError.NotFound)
    }

    return res
}

const handleResponse = (res: Response) => {
    if (res.ok) {
        return res.json()
    }

    throw new Error(`Response from ${res.url} returned error ${res.status} (${res.statusText})`)
}

interface TokenRequest {
    email: string
    password: string
}

interface TokenResponse {
    token: string
}

interface TokenRefreshRequest {
    token: string
}
