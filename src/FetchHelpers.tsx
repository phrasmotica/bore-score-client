import { getHeaders } from "./Auth"

import { Approval } from "./models/Approval"
import { Game } from "./models/Game"
import { Group } from "./models/Group"
import { LinkType } from "./models/LinkType"
import { Player } from "./models/Player"
import { Result } from "./models/Result"
import { Summary } from "./models/Summary"
import { User } from "./models/User"
import { WinMethod } from "./models/WinMethod"

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

export const getPlayers = () => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/players`, {
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

export const getAllGroups = () => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/groups-all`, {
        headers: headers,
    })
    .then(handleResponse)
    .then((data: Group[]) => data)
}

export const getGroups = () => {
    const headers = getHeaders()

    return fetch(`${process.env.REACT_APP_API_URL}/groups`, {
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

export const getResults = (username?: string) => {
    let url = `${process.env.REACT_APP_API_URL}/results`
    if (username) {
        url += `?username=${username}`
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
