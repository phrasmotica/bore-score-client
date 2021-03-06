import { Table } from "semantic-ui-react"

import { ResultCard } from "./ResultCard"

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
}

export const ResultsList = (props: ResultsListProps) => {
    let resultsToShow = sortResultsByRecent(props.results)

    if (props.selectedGames.length > 0) {
        resultsToShow = resultsToShow.filter(r => props.selectedGames.includes(r.gameName))
    }

    if (props.selectedGroups.length > 0) {
        resultsToShow = resultsToShow.filter(r => props.selectedGroups.includes(r.groupName))
    }

    return (
        <div className="results-table">
            <Table compact celled color="teal">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan={2} width={3}>Game</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Result</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Group</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Played</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Submitted</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Notes</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {resultsToShow.map(r => (
                        <ResultCard
                            key={r.id}
                            result={r}
                            games={props.games}
                            groups={props.groups}
                            players={props.players} />
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}
