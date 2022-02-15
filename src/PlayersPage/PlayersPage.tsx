import { useEffect, useState } from "react"

import { fetchPlayers } from "../FetchHelpers"
import { Player } from "../models/Player"
import { PlayerDetails } from "./PlayerDetails"
import { PlayersList } from "./PlayersList"

export const PlayersPage = () => {
    const [players, setPlayers] = useState<Player[]>([])
    const [selectedPlayer, setSelectedPlayer] = useState<string>()

    const fetchAndSetPlayers = () => {
        fetchPlayers().then(setPlayers)
    }

    useEffect(fetchAndSetPlayers, [])

    const getSelectedPlayer = () => players.find(p => p.username === selectedPlayer)

    const onDeletedPlayer = () => {
        fetchAndSetPlayers()
        setSelectedPlayer(undefined)
    }

    const renderDetails = () => {
        if (selectedPlayer !== undefined) {
            return (
                <PlayerDetails
                    player={getSelectedPlayer()!}
                    onDeletedPlayer={onDeletedPlayer} />
            )
        }

        return (
            <div className="player-details">
                <h2>No player selected</h2>
            </div>
        )
    }

    return (
        <div className="players-page">
            <div className="sidebar">
                <PlayersList
                    players={players}
                    selectedPlayer={selectedPlayer}
                    setSelectedPlayer={setSelectedPlayer} />
            </div>

            {renderDetails()}
        </div>
    )
}
