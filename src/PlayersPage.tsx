import { useEffect, useState } from "react"

import { fetchPlayers } from "./FetchHelpers"
import { Player } from "./Player"
import { PlayerDetails } from "./PlayerDetails"
import { PlayersList } from "./PlayersList"

export const PlayersPage = () => {
    const [players, setPlayers] = useState<Player[]>([])
    const [selectedPlayer, setSelectedPlayer] = useState<string>()

    useEffect(() => {
        fetchPlayers()
            .then(setPlayers)
    }, [])

    const getSelectedPlayer = () => players.find(p => p.username === selectedPlayer)

    return (
        <div className="players-page">
            <PlayersList
                players={players}
                selectedPlayer={selectedPlayer}
                setSelectedPlayer={setSelectedPlayer} />

            <PlayerDetails player={getSelectedPlayer()} />
        </div>
    )
}
