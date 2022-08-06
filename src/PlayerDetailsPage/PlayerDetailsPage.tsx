import { useParams } from "react-router-dom"

import { PlayerDetails } from "./PlayerDetails"

import { usePlayer } from "../FetchHelpers"

interface PlayerDetailsPageProps {

}

export const PlayerDetailsPage = (props: PlayerDetailsPageProps) => {
    let { username } = useParams()

    const { player } = usePlayer(username)

    if (player === undefined) {
        return null
    }

    return (
        <div className="player-details-page">
            <PlayerDetails player={player} />
        </div>
    )
}
