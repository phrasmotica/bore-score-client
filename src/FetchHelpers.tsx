import { Player } from "./models/Player"
import { Result } from "./models/Result"

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
