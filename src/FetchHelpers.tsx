import { Game } from "./models/Game"
import { LinkType } from "./models/LinkType"
import { Player } from "./models/Player"
import { Result } from "./models/Result"
import { Summary } from "./models/Summary"
import { WinMethod } from "./models/WinMethod"

export const fetchSummary = () => {
    return fetch("http://localhost:8000/summary")
        .then(res => res.json())
        .catch(err => console.error(err))
        .then((summary: Summary) => summary)
}

export const fetchPlayers = () => {
    return fetch("http://localhost:8000/players")
        .then(res => res.json())
        .catch(err => console.error(err))
        .then((players: Player[]) => players)
}

export const fetchGames = () => {
    return fetch("http://localhost:8000/games")
        .then(res => res.json())
        .catch(err => console.error(err))
        .then((games: Game[]) => games)
}

export const fetchLinkTypes = () => {
    return fetch("http://localhost:8000/linkTypes")
        .then(res => res.json())
        .catch(err => console.error(err))
        .then((linkTypes: LinkType[]) => linkTypes)
}

export const fetchWinMethods = () => {
    return fetch("http://localhost:8000/winMethods")
        .then(res => res.json())
        .catch(err => console.error(err))
        .then((winMethods: WinMethod[]) => winMethods)
}

export const fetchResults = () => {
    return fetch("http://localhost:8000/results")
        .then(res => res.json())
        .catch(err => console.error(err))
        .then((results: Result[]) => results)
}
