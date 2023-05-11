import { useState } from "react"
import { Button, Form, Icon } from "semantic-ui-react"

import { GameFilterDropdown } from "./GameFilterDropdown"
import { GroupFilterDropdown } from "./GroupFilterDropdown"
import { ResultsList } from "./ResultsList"

import { AddResultModal } from "../AddResultModal/AddResultModal"

import { parseToken } from "../Auth"
import { useTitle } from "../Hooks"
import { useGames, useGroups, usePlayers, useResults } from "../QueryHelpers"

import { ApprovalStatus } from "../models/Approval"
import { sortResultsByRecent } from "../models/Result"

import "./ResultsPage.css"

export const ResultsPage = () => {
    useTitle("Results")

    const [showAddResultModal, setShowAddResultModal] = useState(false)
    const [showApprovedOnly, setShowApprovedOnly] = useState(false)
    const [showMineOnly, setShowMineOnly] = useState(false)
    const [selectedGames, setSelectedGames] = useState<string[]>([])
    const [selectedGroups, setSelectedGroups] = useState<string[]>([])

    const token = parseToken()
    const username = token?.username ?? ""

    const { data: games } = useGames()
    const { data: groups } = useGroups(true)
    const { data: players } = usePlayers()
    const { data: results } = useResults()

    let resultsToShow = sortResultsByRecent(results ?? [])

    if (selectedGames.length > 0) {
        resultsToShow = resultsToShow.filter(r => selectedGames.includes(r.gameName))
    }

    if (selectedGroups.length > 0) {
        resultsToShow = resultsToShow.filter(r => selectedGroups.includes(r.groupName))
    }

    if (showMineOnly) {
        resultsToShow = resultsToShow.filter(r => !username || r.scores.map(s => s.username).includes(username))
    }

    if (showApprovedOnly) {
        resultsToShow = resultsToShow.filter(r => r.approvalStatus === ApprovalStatus.Approved)
    }

    return (
        <div className="results-page">
            <AddResultModal open={showAddResultModal} setOpen={setShowAddResultModal} />

            <div className="sidebar">
                <div className="header">
                    <h2>Filters</h2>
                </div>

                <div className="filters">
                    {/* TODO: only show options that pass the other filters.
                        This requires computing the results to show in this component... */}
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

                    <Form className="filters-form">
                        <Form.Checkbox
                            label="Approved results only"
                            checked={showApprovedOnly}
                            onChange={(e, { checked }) => setShowApprovedOnly(checked ?? false)} />

                        <Form.Checkbox
                            label="My results only"
                            checked={showMineOnly}
                            onChange={(e, { checked }) => setShowMineOnly(checked ?? false)} />
                    </Form>
                </div>
            </div>

            <div className="results-page-body">
                <div className="header">
                    <h2>Results</h2>

                    {token && <Button
                        icon
                        color="teal"
                        onClick={() => setShowAddResultModal(true)}>
                        <span>Submit Result&nbsp;</span>
                        <Icon name="edit" />
                    </Button>}
                </div>

                <ResultsList
                    games={games ?? []}
                    groups={groups ?? []}
                    results={resultsToShow}
                    players={players ?? []} />
            </div>
        </div>
    )
}
