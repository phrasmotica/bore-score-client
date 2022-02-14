import { Player } from "./Player"
import { Result } from "./Result"

export const fetchPlayers = () => {
    return fetch("http://localhost:8000/players")
        .then(res => res.json())
        .catch(err => console.error(err))
        .then((players: Player[]) => players)
}

export const fetchResults = () => {
    return fetch("http://localhost:8000/results")
        .then(res => res.json())
        .catch(err => console.error(err))
        .then((results: Result[]) => results)
}
