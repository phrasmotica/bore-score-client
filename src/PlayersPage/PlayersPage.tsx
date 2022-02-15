import { useEffect, useState } from "react"

import { fetchPlayers } from "../FetchHelpers"
import { PlayerDetails } from "./PlayerDetails"
import { SelectablePlayersList } from "./SelectablePlayersList"

import { Player } from "../models/Player"

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

        return null
    }

    return (
        <div className="players-page">
            <h2>Players</h2>

            <div className="players-page-body">
                <div className="sidebar">
                    <SelectablePlayersList
                        players={players}
                        selectedPlayer={selectedPlayer}
                        setSelectedPlayer={setSelectedPlayer} />
                </div>

                {renderDetails()}
            </div>
        </div>
    )
}
