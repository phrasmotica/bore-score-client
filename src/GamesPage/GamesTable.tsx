import { useState } from "react"
import { Table } from "semantic-ui-react"

import { AddResultModal } from "../AddResultModal/AddResultModal"

import { parseToken } from "../Auth"
import { GameCard } from "./GameCard"

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
                        <Table.HeaderCell colSpan={2}>Game</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Players</Table.HeaderCell>
                        {token && <Table.HeaderCell width={2}></Table.HeaderCell>}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {gamesToShow.map(g => {
                        const addResult = () => {
                            setSelectedGame(g.name)
                            setShowAddResultModal(true)
                        }

                        return <GameCard key={g.id} game={g} addResult={addResult} />
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
