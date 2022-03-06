import { Game } from "./models/Game"
import { Group } from "./models/Group"
import { LinkType } from "./models/LinkType"
import { Player } from "./models/Player"
import { Result } from "./models/Result"
import { Summary } from "./models/Summary"
import { WinMethod } from "./models/WinMethod"

export const fetchSummary = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/summary`)
        .then(res => res.json())
        .catch(err => console.error(err))
        .then((summary: Summary) => summary)
}

export const fetchPlayers = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/players`)
        .then(res => res.json())
        .catch(err => console.error(err))
        .then((players: Player[]) => players)
}

export const fetchGames = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/games`)
        .then(res => res.json())
        .catch(err => console.error(err))
        .then((games: Game[]) => games)
}

export const fetchGame = (name: string) => {
    return fetch(`${process.env.REACT_APP_API_URL}/games/${name}`)
        .then(res => res.json())
        .catch(err => console.error(err))
        .then((game: Game) => game)
}

export const fetchAllGroups = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/groups/all`)
        .then(res => res.json())
        .catch(err => console.error(err))
        .then((groups: Group[]) => groups)
}

export const fetchGroups = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/groups`)
        .then(res => res.json())
        .catch(err => console.error(err))
        .then((groups: Group[]) => groups)
}

export const fetchLinkTypes = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/linkTypes`)
        .then(res => res.json())
        .catch(err => console.error(err))
        .then((linkTypes: LinkType[]) => linkTypes)
}

export const fetchWinMethods = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/winMethods`)
        .then(res => res.json())
        .catch(err => console.error(err))
        .then((winMethods: WinMethod[]) => winMethods)
}

export const fetchResults = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/results`)
        .then(res => res.json())
        .catch(err => console.error(err))
        .then((results: Result[]) => results)
}
