import { useState } from "react"

import { GameFilterDropdown } from "./GameFilterDropdown"
import { ResultsList } from "./ResultsList"
import { useAllGroups, useGames, usePlayers, useResults } from "../FetchHelpers"

export const ResultsPage = () => {
    const { games } = useGames()
    const { groups } = useAllGroups()
    const { players } = usePlayers()
    const { results } = useResults()

    const [selectedGames, setSelectedGames] = useState<string[]>([])

    return (
        <div className="results-page">
            <div className="sidebar">
                <div className="header">
                    <h2>Filters</h2>
                </div>

                <GameFilterDropdown
                    games={games}
                    selectedGames={selectedGames}
                    setSelectedGames={setSelectedGames} />
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
                    selectedGames={selectedGames} />
            </div>
        </div>
    )
}
