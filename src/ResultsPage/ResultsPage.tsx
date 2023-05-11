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

    // first element is the condition for the filter to apply,
    // second element is the filter itself
    type Filter<T> = [boolean, (r: T) => boolean]

    let filters = [
        [selectedGames.length > 0, r => selectedGames.includes(r.gameName)],
        [selectedGroups.length > 0, r => selectedGroups.includes(r.groupName)],
        [showMineOnly, r => !username || r.scores.map(s => s.username).includes(username)],
        [showApprovedOnly, r => r.approvalStatus === ApprovalStatus.Approved],
    ] as Filter<ResultResponse>[]

    const applyFilters = (results: ResultResponse[], filters: Filter<ResultResponse>[]) => {
        let filteredResults = [...results]

        for (let f of filters) {
            const [condition, func] = f
            filteredResults = filteredResults.filter(r => !condition || func(r))
        }

        return filteredResults
    }

    let allResults = sortResultsByRecent(results ?? [])
    let filteredResults = applyFilters(allResults, filters)

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
                        results={applyFilters(allResults, filters.filter((v, i) => i !== 0))}
                        selectedGames={selectedGames}
                        setSelectedGames={setSelectedGames} />

                    <GroupFilterDropdown
                        groups={groups ?? []}
                        results={applyFilters(allResults, filters.filter((v, i) => i !== 1))}
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
                    results={filteredResults}
                    players={players ?? []} />
            </div>
        </div>
    )
}
