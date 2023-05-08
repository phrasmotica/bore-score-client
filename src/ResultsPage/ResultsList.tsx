import { List } from "semantic-ui-react"

import { ResultCard } from "./ResultCard"

import { parseToken } from "../Auth"

import { Game } from "../models/Game"
import { Group } from "../models/Group"
import { Player } from "../models/Player"
import { Result, sortResultsByRecent } from "../models/Result"

interface ResultsListProps {
    games: Game[]
    groups: Group[]
    results: Result[]
    players: Player[]
    selectedGames: string[]
    selectedGroups: string[]
    showApprovedOnly?: boolean
    approvals?: boolean
    hideGroups?: boolean
}

export const ResultsList = (props: ResultsListProps) => {
    const token = parseToken()

    let resultsToShow = sortResultsByRecent(props.results)

    if (props.selectedGames.length > 0) {
        resultsToShow = resultsToShow.filter(r => props.selectedGames.includes(r.gameName))
    }

    if (props.selectedGroups.length > 0) {
        resultsToShow = resultsToShow.filter(r => props.selectedGroups.includes(r.groupName))
    }

    const renderNoResultsMessage = () => (
        <List.Item>
            <p className="no-results-message">No results to show.</p>
        </List.Item>
    )

    return (
        <div className="results-list">
            <List>
                {resultsToShow.length <= 0 && renderNoResultsMessage()}
                {resultsToShow.length > 0 && resultsToShow.map(r => (
                    <ResultCard
                        approvals={props.approvals}
                        showApprovedOnly={props.showApprovedOnly}
                        hideGroups={props.hideGroups}
                        key={r.id}
                        result={r}
                        games={props.games}
                        groups={props.groups}
                        players={props.players}
                        currentUser={token?.username} />
                ))}
            </List>
        </div>
    )
}
