import { useState } from "react"

import { GameFilterMenu } from "./GameFilterMenu"
import { ResultsList } from "./ResultsList"
import { useAllGroups, useGames, usePlayers, useResults } from "../FetchHelpers"

export const ResultsPage = () => {
    const { games } = useGames()
    const { groups } = useAllGroups()
    const { players } = usePlayers()
    const { results } = useResults()

    const [selectedGame, setSelectedGame] = useState("")

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
