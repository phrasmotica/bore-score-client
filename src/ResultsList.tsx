import { useEffect, useState } from "react"
import { List } from "semantic-ui-react"

import { fetchResults } from "./FetchHelpers"
import { Result } from "./Result"

export const ResultsList = () => {
    const [results, setResults] = useState<Result[]>([])

    useEffect(() => {
        fetchResults()
            .then(setResults)
    })

    return (
        <div className="results-list">
            <List divided relaxed>
                {results.map(r => (
                    <List.Item key={r.id}>
                        <List.Content>
                            <List.Header>Result</List.Header>
                            <List.Description>{r.gameId}</List.Description>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
        </div>
    )
}
