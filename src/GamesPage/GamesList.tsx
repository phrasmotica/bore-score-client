import { useState } from "react"
import { List } from "semantic-ui-react"

import { AddResultModal } from "../AddResultModal/AddResultModal"

import { GameCard } from "./GameCard"

import { Game } from "../models/Game"

interface GamesListProps {
    games: Game[]
}

export const GamesList = (props: GamesListProps) => {
    const [selectedGame, setSelectedGame] = useState("")
    const [showAddResultModal, setShowAddResultModal] = useState(false)

    return (
        <div className="games-table">
            <AddResultModal game={selectedGame} open={showAddResultModal} setOpen={setShowAddResultModal} />

            <List divided>
                {props.games.map(g => {
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
