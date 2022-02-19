import { useEffect, useState } from "react"

import { GameFilterMenu } from "./GameFilterMenu"
import { ResultsList } from "./ResultsList"
import { fetchGames, fetchPlayers, fetchResults } from "../FetchHelpers"

import { Game } from "../models/Game"
import { Player } from "../models/Player"
import { Result } from "../models/Result"

export const ResultsPage = () => {
    const [games, setGames] = useState<Game[]>([])
    const [players, setPlayers] = useState<Player[]>([])
    const [results, setResults] = useState<Result[]>([])
    const [selectedGame, setSelectedGame] = useState("")

    useEffect(() => {
        fetchGames()
            .then(setGames)

        fetchPlayers()
            .then(setPlayers)

        fetchResults()
            .then(setResults)
    }, [])

    return (
        <div className="results-page">
            <h2>Results</h2>

            <div className="results-page-body">
                <div className="sidebar">
                    <GameFilterMenu
                        games={games}
                        results={results}
                        selectedGame={selectedGame}
                        setSelectedGame={setSelectedGame} />
                </div>

                <ResultsList
                    games={games}
                    results={results}
                    players={players}
                    selectedGame={selectedGame} />
            </div>
        </div>
    )
}
