import { useParams, useSearchParams } from "react-router-dom"

import { PlayerDetails } from "./PlayerDetails"

import { usePlayer } from "../FetchHelpers"

interface PlayerDetailsPageProps {

}

export const PlayerDetailsPage = (props: PlayerDetailsPageProps) => {
    let { username } = useParams()

    const [searchParams, setSearchParams] = useSearchParams()

    const { player } = usePlayer(username)

    const onDeletedPlayer = () => {
        searchParams.delete("player")
        setSearchParams(searchParams)

        // fetchAndSetPlayers()
    }

    if (player === undefined) {
        return null
    }

    return (
        <div className="player-details-page">
            <div className="header">
                <a href="/players">
                    <span>&larr;&nbsp;Back to players list</span>
                </a>
            </div>

            <PlayerDetails player={player} onDeletedPlayer={onDeletedPlayer} />
        </div>
    )
}
