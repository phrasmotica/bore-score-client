import { useEffect, useState } from "react"
import { List } from "semantic-ui-react"

import { ResultCard } from "./ResultCard"
import { fetchResults } from "../FetchHelpers"

import { Game } from "../models/Game"
import { Player } from "../models/Player"
import { Result } from "../models/Result"

interface ResultsListProps {
    games: Game[]
    players: Player[]
}

export const ResultsList = (props: ResultsListProps) => {
    const [results, setResults] = useState<Result[]>([])

    useEffect(() => {
        fetchResults()
            .then(setResults)
    }, [])

    return (
        <div className="results-list">
            <List divided relaxed>
                {results.map(r => (
                    <ResultCard key={r.id} result={r} games={props.games} players={props.players} />
                ))}
            </List>
        </div>
    )
}
