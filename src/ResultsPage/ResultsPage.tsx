import { useState } from "react"
import { Button, Form, Icon } from "semantic-ui-react"

import { GameFilterDropdown } from "./GameFilterDropdown"
import { GroupFilterDropdown } from "./GroupFilterDropdown"
import { ResultsList } from "./ResultsList"

import { AddResultModal } from "../AddResultModal/AddResultModal"

import { parseToken } from "../Auth"
import { FilterSet } from "../Filters"
import { useTitle } from "../Hooks"
import { useGames, useGroups, usePlayers, useResults } from "../QueryHelpers"

import { ApprovalStatus } from "../models/Approval"
import { ResultResponse, sortResultsByRecent } from "../models/Result"

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

    let filters = new FilterSet<ResultResponse>([
        {
            condition: selectedGames.length > 0,
            func: r => selectedGames.includes(r.gameName),
        },
        {
            condition: selectedGroups.length > 0,
            func: r => selectedGroups.includes(r.groupName),
        },
        {
            condition: showApprovedOnly,
            func: r => r.approvalStatus === ApprovalStatus.Approved,
        },
        {
            condition: showMineOnly,
            func: r => !username || r.scores.map(s => s.username).includes(username),
        },
    ])

    let allResults = sortResultsByRecent(results ?? [])
    let filteredResults = filters.apply(allResults)

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
                        results={filters.except(0).apply(allResults)}
                        selectedGames={selectedGames}
                        setSelectedGames={setSelectedGames} />

                    <GroupFilterDropdown
                        groups={groups ?? []}
                        results={filters.except(1).apply(allResults)}
                        selectedGroups={selectedGroups}
                        setSelectedGroups={setSelectedGroups} />

                    <Form className="filters-form">
                        <Form.Checkbox
                            label="Approved results only"
                            checked={showApprovedOnly}
                            onChange={(e, { checked }) => setShowApprovedOnly(checked ?? false)}
                            disabled={filters.only(2).forceApply(filteredResults).length <= 0} />

                        <Form.Checkbox
                            label="My results only"
                            checked={showMineOnly}
                            onChange={(e, { checked }) => setShowMineOnly(checked ?? false)}
                            disabled={filters.only(3).forceApply(filteredResults).length <= 0} />
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
                    results={filteredResults}
                    players={players ?? []} />
            </div>
        </div>
    )
}
