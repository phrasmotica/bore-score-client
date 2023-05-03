import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-semantic-toasts"

import { PlayerDetails } from "./PlayerDetails"

import { PersistentError } from "../FetchHelpers"
import { usePlayer } from "../QueryHelpers"

interface PlayerDetailsPageProps {

}

export const PlayerDetailsPage = (props: PlayerDetailsPageProps) => {
    let { username } = useParams()

    const navigate = useNavigate()

    const { data: player } = usePlayer(username || "", error => {
        if (error.message === PersistentError.NotFound) {
            playerNotFoundToast()
            navigate("/")
        }
    })

    if (player === undefined) {
        return null
    }

    return (
        <div className="player-details-page">
            <PlayerDetails player={player} />
        </div>
    )
}

const playerNotFoundToast = () => toast({
    title: "",
    description: "That player does not exist.",
    color: "red",
    icon: "delete",
})
