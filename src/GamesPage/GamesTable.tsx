import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Icon, Table } from "semantic-ui-react"

import { AddResultModal } from "../AddResultModal/AddResultModal"
import { GameImage } from "../GameImage"

import { parseToken } from "../Auth"

import { Game } from "../models/Game"
import { WinMethod } from "../models/WinMethod"

interface GamesTableProps {
    games: Game[]
    winMethods: WinMethod[]
    selectedWinMethods: string[]
    useMinPlayers: boolean
    minPlayers: number
    useMaxPlayers: boolean
    maxPlayers: number
}

export const GamesTable = (props: GamesTableProps) => {
    const [selectedGame, setSelectedGame] = useState("")
    const [showAddResultModal, setShowAddResultModal] = useState(false)

    const token = parseToken()

    let gamesToShow = [...props.games]

    if (props.selectedWinMethods.length > 0) {
        gamesToShow = gamesToShow.filter(g => props.selectedWinMethods.includes(g.winMethod))
    }

    if (props.useMinPlayers) {
        gamesToShow = gamesToShow.filter(g => g.minPlayers >= props.minPlayers)
    }

    if (props.useMaxPlayers) {
        gamesToShow = gamesToShow.filter(g => g.maxPlayers <= props.maxPlayers)
    }

    return (
        <div className="games-table">
            <AddResultModal game={selectedGame} open={showAddResultModal} setOpen={setShowAddResultModal} />

            <Table compact celled color="teal">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan={2} width={3}>Game</Table.HeaderCell>
                        <Table.HeaderCell width={6}>Synopsis</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Players</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Win Method</Table.HeaderCell>
                        {token && <Table.HeaderCell width={3}></Table.HeaderCell>}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {gamesToShow.map(g => {
                        let playersStr = `${g.minPlayers}-${g.maxPlayers}`
                        if (g.minPlayers === g.maxPlayers) {
                            playersStr = g.minPlayers.toString()
                        }

                        let winMethod = props.winMethods.find(w => w.name === g.winMethod)

                        const addResult = () => {
                            setSelectedGame(g.name)
                            setShowAddResultModal(true)
                        }

                        return (
                            <Table.Row key={g.name}>
                                <Table.Cell>
                                    <GameImage imageSrc={g.imageLink} />
                                </Table.Cell>

                                <Table.Cell>
                                    <Link to={`/games/${g.name}`}>
                                        {g.displayName}
                                    </Link>
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

                                {token && <Table.Cell>
                                    <Button
                                        icon
                                        fluid
                                        color="teal"
                                        onClick={addResult}>
                                        <span>Submit Result&nbsp;</span>
                                        <Icon name="edit" />
                                    </Button>
                                </Table.Cell>}
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
