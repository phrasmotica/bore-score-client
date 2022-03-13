import { useState } from "react"

import { GameFilterDropdown } from "./GameFilterDropdown"
import { GroupFilterDropdown } from "./GroupFilterDropdown"
import { ResultsList } from "./ResultsList"

import { useAllGroups, useGames, usePlayers, useResults } from "../FetchHelpers"

export const ResultsPage = () => {
    const { games } = useGames()
    const { groups } = useAllGroups()
    const { players } = usePlayers()
    const { results } = useResults()

    const [selectedGames, setSelectedGames] = useState<string[]>([])
    const [selectedGroups, setSelectedGroups] = useState<string[]>([])

    return (
        <div className="results-page">
            <div className="sidebar">
                <div className="header">
                    <h2>Filters</h2>
                </div>

                <GameFilterDropdown
                    games={games}
                    results={results}
                    selectedGames={selectedGames}
                    setSelectedGames={setSelectedGames} />

                <GroupFilterDropdown
                    groups={groups}
                    results={results}
                    selectedGroups={selectedGroups}
                    setSelectedGroups={setSelectedGroups} />
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
                    selectedGames={selectedGames}
                    selectedGroups={selectedGroups} />
            </div>
        </div>
    )
}
