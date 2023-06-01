import { List, Loader, Message } from "semantic-ui-react"

import { ResultCard } from "./ResultCard"

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
    isLoading?: boolean
}

export const ResultsList = (props: ResultsListProps) => (
    <div className="results-list">
        {props.isLoading && <Loader inline="centered" active>
            Loading results...
        </Loader>}

        {!props.isLoading && <List>
            {props.results.length <= 0 && <Message className="no-results-message">
                No results to show.
            </Message>}

            {props.results.length > 0 && props.results.map(r => (
                <ResultCard
                    approvals={props.approvals}
                    hideGroups={props.hideGroups}
                    key={r.id}
                    result={r}
                    games={props.games}
                    groups={props.groups}
                    players={props.players} />
            ))}
        </List>}
    </div>
)
