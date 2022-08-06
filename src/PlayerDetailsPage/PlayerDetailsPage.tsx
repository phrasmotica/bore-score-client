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
    }

    if (player === undefined) {
        return null
    }

    return (
        <div className="player-details-page">
            <PlayerDetails player={player} onDeletedPlayer={onDeletedPlayer} />
        </div>
    )
}
