import { useState } from "react"
import { Button, Icon } from "semantic-ui-react"

import { GameFilterDropdown } from "./GameFilterDropdown"
import { GroupFilterDropdown } from "./GroupFilterDropdown"
import { ResultsList } from "./ResultsList"

import { AddPlayerModal } from "../AddPlayerModal/AddPlayerModal"
import { AddResultModal } from "../AddResultModal/AddResultModal"
import { useAllGroups, useGames, usePlayers, useResults } from "../FetchHelpers"
import { useTitle } from "../Hooks"

import "./ResultsPage.css"

export const ResultsPage = () => {
    useTitle("Results")

    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false)
    const [showAddResultModal, setShowAddResultModal] = useState(false)

    const { games } = useGames()
    const { groups } = useAllGroups()
    const { players } = usePlayers()
    const { results } = useResults()

    const [selectedGames, setSelectedGames] = useState<string[]>([])
    const [selectedGroups, setSelectedGroups] = useState<string[]>([])

    return (
        <div className="results-page">
            <AddPlayerModal open={showAddPlayerModal} setOpen={setShowAddPlayerModal} />
            <AddResultModal open={showAddResultModal} setOpen={setShowAddResultModal} />

            <div className="sidebar">
                <div className="header">
                    <h2>Filters</h2>
                </div>

                <div className="filters">
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
            </div>

            <div className="results-page-body">
                <div className="header">
                    <h2>Results</h2>

                    <Button
                        icon
                        color="yellow"
                        onClick={() => setShowAddPlayerModal(true)}>
                        <span>Add New Player&nbsp;</span>
                        <Icon name="plus" />
                    </Button>

                    <Button
                        icon
                        color="yellow"
                        onClick={() => setShowAddResultModal(true)}>
                        <span>Add New Result&nbsp;</span>
                        <Icon name="plus" />
                    </Button>
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
