import { useEffect, useState } from "react"

import { AddPlayer } from "./AddPlayer"
import { fetchPlayers } from "./FetchHelpers"
import { Player } from "./Player"
import { PlayerDetails } from "./PlayerDetails"
import { PlayersList } from "./PlayersList"

export const PlayersPage = () => {
    const [players, setPlayers] = useState<Player[]>([])
    const [selectedPlayer, setSelectedPlayer] = useState<string>()
    const [showAddPlayer, setShowAddPlayer] = useState(false)

    const fetchAndSetPlayers = () => {
        fetchPlayers().then(setPlayers)
    }

    useEffect(fetchAndSetPlayers, [])

    const getSelectedPlayer = () => players.find(p => p.username === selectedPlayer)

    const onAddedPlayer = fetchAndSetPlayers

    const onDeletedPlayer = () => {
        fetchAndSetPlayers()
        setSelectedPlayer(undefined)
    }

    const renderDetails = () => {
        if (showAddPlayer) {
            return <AddPlayer onAddedPlayer={onAddedPlayer} />
        }

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

    const setSelectedPlayerHandler = (username: string | undefined) => {
        setSelectedPlayer(username)
        setShowAddPlayer(false)
    }

    return (
        <div className="players-page">
            <PlayersList
                players={players}
                selectedPlayer={selectedPlayer}
                setSelectedPlayer={setSelectedPlayerHandler}
                setAddPlayer={() => setShowAddPlayer(true)} />

            {renderDetails()}
        </div>
    )
}
