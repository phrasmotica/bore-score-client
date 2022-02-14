import { List } from "semantic-ui-react"

import { ResultCard } from "./ResultCard"

import { Game } from "../models/Game"
import { Player } from "../models/Player"
import { Result } from "../models/Result"

interface ResultsListProps {
    games: Game[]
    results: Result[]
    players: Player[]
    selectedGame: number | undefined
}

export const ResultsList = (props: ResultsListProps) => {
    let resultsToShow = props.results
    if (props.selectedGame !== undefined) {
        resultsToShow = resultsToShow.filter(r => r.gameId === props.selectedGame)
    }

    return (
        <div className="results-list">
            <List divided relaxed>
                {resultsToShow.map(r => (
                    <ResultCard key={r.id} result={r} games={props.games} players={props.players} />
                ))}
            </List>
        </div>
    )
}