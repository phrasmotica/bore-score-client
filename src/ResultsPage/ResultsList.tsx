import { List, Message } from "semantic-ui-react"

import { ResultCard } from "./ResultCard"

import { parseToken } from "../Auth"

import { Game } from "../models/Game"
import { Group } from "../models/Group"
import { Player } from "../models/Player"
import { ResultResponse } from "../models/Result"

interface ResultsListProps {
    games: Game[]
    groups: Group[]
    results: ResultResponse[]
    players: Player[]
    approvals?: boolean
    hideGroups?: boolean
}

export const ResultsList = (props: ResultsListProps) => {
    const token = parseToken()

    const renderNoResultsMessage = () => (
        <Message className="no-results-message">
            No results to show.
        </Message>
    )

    return (
        <div className="results-list">
            <List>
                {props.results.length <= 0 && renderNoResultsMessage()}
                {props.results.length > 0 && props.results.map(r => (
                    <ResultCard
                        approvals={props.approvals}
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
