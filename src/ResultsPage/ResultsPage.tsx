import { useEffect, useState } from "react"

import { GameFilterMenu } from "./GameFilterMenu"
import { ResultsList } from "./ResultsList"
import { fetchAllGroups, fetchGames, fetchPlayers, fetchResults } from "../FetchHelpers"

import { Game } from "../models/Game"
import { Group } from "../models/Group"
import { Player } from "../models/Player"
import { Result } from "../models/Result"

export const ResultsPage = () => {
    const [games, setGames] = useState<Game[]>([])
    const [groups, setGroups] = useState<Group[]>([])
    const [players, setPlayers] = useState<Player[]>([])
    const [results, setResults] = useState<Result[]>([])
    const [selectedGame, setSelectedGame] = useState("")

    useEffect(() => {
        fetchGames()
            .then(setGames)

        fetchAllGroups()
            .then(setGroups)

        fetchPlayers()
            .then(setPlayers)

        fetchResults()
            .then(setResults)
    }, [])

    return (
        <div className="results-page">
            <div className="sidebar">
                <GameFilterMenu
                    games={games}
                    results={results}
                    selectedGame={selectedGame}
                    setSelectedGame={setSelectedGame} />
            </div>

            <div className="results-page-body">
                <div className="header">
                    <h2>Results</h2>
                </div>

                <ResultsList
                    games={games}
                    groups={groups}
                    results={results}
                    players={players}
                    selectedGame={selectedGame} />
            </div>
        </div>
    )
}
