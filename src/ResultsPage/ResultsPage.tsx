import { useEffect, useMemo, useState } from "react"
import moment from "moment"
import { useSearchParams } from "react-router-dom"
import { Button, Form, Icon } from "semantic-ui-react"

import { GameFilterDropdown } from "./GameFilterDropdown"
import { GroupFilterDropdown } from "./GroupFilterDropdown"
import { ResultsList } from "./ResultsList"

import { AddResultModal } from "../AddResultModal/AddResultModal"
import { DateTimeForm } from "../AddResultModal/DateTimeForm"

import { parseToken } from "../Auth"
import { FilterSet, Predicate } from "../Filters"
import { useTitle } from "../Hooks"
import { useGames, useGroups, usePlayers, useResults } from "../QueryHelpers"

import { ApprovalStatus } from "../models/Approval"
import { ResultResponse, sortResultsByRecent } from "../models/Result"

import "./ResultsPage.css"

export const ResultsPage = () => {
    useTitle("Results")

    const [searchParams, _] = useSearchParams()

    const { data: results } = useResults()

    let allResults = useMemo(() => sortResultsByRecent(results ?? []), [results])

    let oldestTimePlayed = useMemo(() => {
        if (allResults.length <= 0) {
            return moment.unix(0)
        }

        return moment.unix(allResults.reduce((a, b) => a.timePlayed < b.timePlayed ? a : b).timePlayed)
    }, [allResults])

    let newestTimePlayed = useMemo(() => {
        if (allResults.length <= 0) {
            return moment.unix(0)
        }

        return moment.unix(allResults.reduce((a, b) => a.timePlayed > b.timePlayed ? a : b).timePlayed)
    }, [allResults])

    const [showAddResultModal, setShowAddResultModal] = useState(false)
    const [showApprovedOnly, setShowApprovedOnly] = useState(false)
    const [showMineOnly, setShowMineOnly] = useState(false)
    const [selectedGames, setSelectedGames] = useState<string[]>([])
    const [selectedGroups, setSelectedGroups] = useState<string[]>([])

    const [filterByTimePlayed, setFilterByTimePlayed] = useState(false)
    const [timePlayedEarliest, setTimePlayedEarliest] = useState(oldestTimePlayed)
    const [timePlayedLatest, setTimePlayedLatest] = useState(newestTimePlayed)

    const token = parseToken()
    const username = token?.username ?? ""

    const { data: games } = useGames()
    const { data: groups } = useGroups(true)
    const { data: players } = usePlayers()

    useEffect(() => {
        const gameFromParam = searchParams.get("game")
        if (gameFromParam) {
            setSelectedGames([gameFromParam])
        }
        else {
            setSelectedGames([])
        }

        const groupFromParam = searchParams.get("group")
        if (groupFromParam) {
            setSelectedGroups([groupFromParam])
        }
        else {
            setSelectedGroups([])
        }
    }, [searchParams])

    let filters = new FilterSet<ResultResponse>()
        .with("game", new Predicate(selectedGames.length > 0, r => selectedGames.includes(r.gameId)))
        .with("group", new Predicate(selectedGroups.length > 0, r => selectedGroups.includes(r.groupId)))
        .with("approvedOnly", new Predicate(showApprovedOnly, r => r.approvalStatus === ApprovalStatus.Approved))
        .with("mineOnly", new Predicate(showMineOnly, r => !username || r.scores.map(s => s.username).includes(username)))
        .with("timePlayedEarliest", new Predicate(filterByTimePlayed, r => r.timePlayed >= timePlayedEarliest.unix()))
        .with("timePlayedLatest", new Predicate(filterByTimePlayed, r => r.timePlayed <= timePlayedLatest.unix()))

    let filteredResults = filters.apply(allResults)

    return (
        <div className="results-page">
            <AddResultModal open={showAddResultModal} setOpen={setShowAddResultModal} />

            <div className="sidebar">
                <div className="header">
                    <h2>Filters</h2>
                </div>

                <div className="filters">
                    <div>
                        <GameFilterDropdown
                            games={games ?? []}
                            results={filters.except("game").apply(allResults)}
                            selectedGames={selectedGames}
                            setSelectedGames={setSelectedGames} />

                        <GroupFilterDropdown
                            groups={groups ?? []}
                            results={filters.except("group").apply(allResults)}
                            selectedGroups={selectedGroups}
                            setSelectedGroups={setSelectedGroups} />

                        <Form className="filters-form">
                            <Form.Checkbox
                                label="Approved results only"
                                checked={showApprovedOnly}
                                onChange={(e, { checked }) => setShowApprovedOnly(checked ?? false)}
                                disabled={filters.only("approvedOnly").forceApply(filteredResults).length <= 0} />

                            <Form.Checkbox
                                label="My results only"
                                checked={showMineOnly}
                                onChange={(e, { checked }) => setShowMineOnly(checked ?? false)}
                                disabled={filters.only("mineOnly").forceApply(filteredResults).length <= 0} />
                        </Form>
                    </div>

                    <div>
                        <Form className="filters-form">
                            <Form.Checkbox
                                label="Filter by time played"
                                checked={filterByTimePlayed}
                                onChange={(e, { checked }) => setFilterByTimePlayed(checked ?? false)} />
                        </Form>

                        <div className="datetime-container">
                            <DateTimeForm
                                dateLabel="Earliest"
                                timePlayed={timePlayedEarliest}
                                setTimePlayed={setTimePlayedEarliest}
                                disabled={!filterByTimePlayed} />

                            <DateTimeForm
                                dateLabel="Latest"
                                timePlayed={timePlayedLatest}
                                setTimePlayed={setTimePlayedLatest}
                                disabled={!filterByTimePlayed} />
                        </div>
                    </div>
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
