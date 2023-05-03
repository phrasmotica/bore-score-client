import { useState } from "react"
import { SemanticToastContainer } from "react-semantic-toasts"
import { Button, Icon } from "semantic-ui-react"

import { GameFilterDropdown } from "./GameFilterDropdown"
import { GroupFilterDropdown } from "./GroupFilterDropdown"
import { ResultsList } from "./ResultsList"

import { AddResultModal } from "../AddResultModal/AddResultModal"

import { parseToken } from "../Auth"
import { useTitle } from "../Hooks"
import { useGames, useGroups, usePlayers, useResults } from "../QueryHelpers"

import "./ResultsPage.css"

export const ResultsPage = () => {
    useTitle("Results")

    const [showAddResultModal, setShowAddResultModal] = useState(false)

    const token = parseToken()

    const { data: games } = useGames()
    const { data: groups } = useGroups(true)
    const { data: players } = usePlayers()
    const { data: results } = useResults()

    const [selectedGames, setSelectedGames] = useState<string[]>([])
    const [selectedGroups, setSelectedGroups] = useState<string[]>([])

    return (
        <div className="results-page">
            <AddResultModal open={showAddResultModal} setOpen={setShowAddResultModal} />

            <div className="sidebar">
                <div className="header">
                    <h2>Filters</h2>
                </div>

                <div className="filters">
                    <GameFilterDropdown
                        games={games ?? []}
                        results={results ?? []}
                        selectedGames={selectedGames}
                        setSelectedGames={setSelectedGames} />

                    <GroupFilterDropdown
                        groups={groups ?? []}
                        results={results ?? []}
                        selectedGroups={selectedGroups}
                        setSelectedGroups={setSelectedGroups} />
                </div>
            </div>

            <div className="results-page-body">
                <div className="header">
                    <h2>Results</h2>

                    {token && <Button
                        icon
                        color="yellow"
                        onClick={() => setShowAddResultModal(true)}>
                        <span>Add New Result&nbsp;</span>
                        <Icon name="plus" />
                    </Button>}
                </div>

                <ResultsList
                    games={games ?? []}
                    groups={groups ?? []}
                    results={results ?? []}
                    players={players ?? []}
                    selectedGames={selectedGames}
                    selectedGroups={selectedGroups} />
            </div>

            <SemanticToastContainer position="bottom-right" maxToasts={3} />
        </div>
    )
}
