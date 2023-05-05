import { useState } from "react"
import { List } from "semantic-ui-react"

import { AddResultModal } from "../AddResultModal/AddResultModal"

import { GameCard } from "./GameCard"

import { Game } from "../models/Game"
import { WinMethod } from "../models/WinMethod"

interface GamesListProps {
    games: Game[]
    winMethods: WinMethod[]
    selectedWinMethods: string[]
    useMinPlayers: boolean
    minPlayers: number
    useMaxPlayers: boolean
    maxPlayers: number
}

export const GamesList = (props: GamesListProps) => {
    const [selectedGame, setSelectedGame] = useState("")
    const [showAddResultModal, setShowAddResultModal] = useState(false)

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

            <List divided>
                {gamesToShow.map(g => {
                    const addResult = () => {
                        setSelectedGame(g.name)
                        setShowAddResultModal(true)
                    }

                    return (
                        <List.Item key={g.id}>
                            <GameCard game={g} addResult={addResult} />
                        </List.Item>
                    )
                })}
            </List>
        </div>
    )
}
