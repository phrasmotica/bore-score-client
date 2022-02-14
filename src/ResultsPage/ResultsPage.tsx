import { useEffect, useState } from "react"

import { ResultsList } from "./ResultsList"
import { fetchGames, fetchPlayers } from "../FetchHelpers"

import { Game } from "../models/Game"
import { Player } from "../models/Player"

export const ResultsPage = () => {
    const [games, setGames] = useState<Game[]>([])
    const [players, setPlayers] = useState<Player[]>([])

    useEffect(() => {
        fetchGames()
            .then(setGames)

        fetchPlayers()
            .then(setPlayers)
    }, [])

    return (
        <div className="results-page">
            <ResultsList games={games} players={players} />
        </div>
    )
}
