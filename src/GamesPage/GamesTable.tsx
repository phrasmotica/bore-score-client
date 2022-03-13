import { useNavigate } from "react-router"
import { Button, Icon, Table } from "semantic-ui-react"

import { GameImage } from "../GameImage"

import { Game } from "../models/Game"
import { WinMethod } from "../models/WinMethod"

interface GamesTableProps {
    games: Game[]
    winMethods: WinMethod[]
    selectedWinMethods: string[]
}

export const GamesTable = (props: GamesTableProps) => {
    const navigate = useNavigate()

    let gamesToShow = [...props.games]

    if (props.selectedWinMethods.length > 0) {
        gamesToShow = gamesToShow.filter(g => props.selectedWinMethods.includes(g.winMethod))
    }

    return (
        <div className="games-table">
            <Table compact celled color="teal">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan={2} width={3}>Game</Table.HeaderCell>
                        <Table.HeaderCell width={6}>Synopsis</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Players</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Win Method</Table.HeaderCell>
                        <Table.HeaderCell width={3}></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {gamesToShow.map(g => {
                        let playersStr = `${g.minPlayers}-${g.maxPlayers}`
                        if (g.minPlayers === g.maxPlayers) {
                            playersStr = g.minPlayers.toString()
                        }

                        let winMethod = props.winMethods.find(w => w.name === g.winMethod)

                        const submitResult = () => navigate(`/add-result?game=${g.name}`)

                        return (
                            <Table.Row>
                                <Table.Cell>
                                    <GameImage imageSrc={g.imageLink} />
                                </Table.Cell>

                                <Table.Cell>
                                    <a href={`/games/${g.name}`}>
                                        {g.displayName}
                                    </a>
                                </Table.Cell>

                                <Table.Cell>
                                    {g.synopsis || g.description || "N/A"}
                                </Table.Cell>

                                <Table.Cell>
                                    {playersStr}
                                </Table.Cell>

                                <Table.Cell>
                                    {winMethod?.displayName ?? g.winMethod}
                                </Table.Cell>

                                <Table.Cell>
                                    <Button
                                        icon
                                        fluid
                                        color="teal"
                                        onClick={submitResult}>
                                        <span>Submit Result&nbsp;</span>
                                        <Icon name="edit" />
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
