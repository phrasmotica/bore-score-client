import { List } from "semantic-ui-react"

import { ResultCard } from "./ResultCard"

import { parseToken } from "../Auth"

import { Game } from "../models/Game"
import { Group } from "../models/Group"
import { Player } from "../models/Player"
import { Result } from "../models/Result"

interface ResultsListProps {
    games: Game[]
    groups: Group[]
    results: Result[]
    players: Player[]
    showApprovedOnly?: boolean
    approvals?: boolean
    hideGroups?: boolean
}

export const ResultsList = (props: ResultsListProps) => {
    const token = parseToken()

    const renderNoResultsMessage = () => (
        <List.Item>
            <p className="no-results-message">No results to show.</p>
        </List.Item>
    )

    return (
        <div className="results-list">
            <List>
                {props.results.length <= 0 && renderNoResultsMessage()}
                {props.results.length > 0 && props.results.map(r => (
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
