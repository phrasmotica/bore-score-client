import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { usePlayers } from "../FetchHelpers"
import { PlayerDetails } from "./PlayerDetails"
import { SelectablePlayersList } from "./SelectablePlayersList"

export const PlayersPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const { players } = usePlayers()
    const [selectedPlayer, setSelectedPlayer] = useState<string>()

    const findPlayer = useCallback((username: string | null) => {
        return players.find(p => p.username === username)
    }, [players])

    useEffect(() => {
        if (players.length > 0) {
            let playerParam = searchParams.get("player")
            setSelectedPlayer(findPlayer(playerParam)?.username)
        }
    }, [players, searchParams, findPlayer])

    const onDeletedPlayer = () => {
        searchParams.delete("player")
        setSearchParams(searchParams)

        // fetchAndSetPlayers()
    }

    const renderDetails = () => {
        if (selectedPlayer !== undefined) {
            return (
                <PlayerDetails
                    player={findPlayer(selectedPlayer)!}
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
