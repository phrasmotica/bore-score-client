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

    useEffect(() => {
        fetchPlayers()
            .then(setPlayers)
    }, [showAddPlayer])

    const getSelectedPlayer = () => players.find(p => p.username === selectedPlayer)

    const setSelectedPlayerHandler = (username: string | undefined) => {
        setSelectedPlayer(username)
        setShowAddPlayer(false)
    }

    let details = <PlayerDetails player={getSelectedPlayer()} />
    if (showAddPlayer) {
        details = <AddPlayer addedPlayer={() => setShowAddPlayer(false)} />
    }

    return (
        <div className="players-page">
            <PlayersList
                players={players}
                selectedPlayer={selectedPlayer}
                setSelectedPlayer={setSelectedPlayerHandler}
                setAddPlayer={() => setShowAddPlayer(true)} />

            {details}
        </div>
    )
}
