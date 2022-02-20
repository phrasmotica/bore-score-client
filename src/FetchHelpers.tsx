import { Game } from "./models/Game"
import { Player } from "./models/Player"
import { Result } from "./models/Result"
import { WinMethod } from "./models/WinMethod"

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
