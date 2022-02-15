import { Button } from "semantic-ui-react"

import { Player } from "../models/Player"

interface PlayerDetailsProps {
    player: Player
    onDeletedPlayer: () => void
}

export const PlayerDetails = (props: PlayerDetailsProps) => {
    const deletePlayer = () => {
        fetch(`http://localhost:8000/players/${props.player.username}`, {
            method: "DELETE"
        })
            .then(props.onDeletedPlayer)
    }

    return (
        <div className="player-details">
            <h3>{props.player.displayName}</h3>

            <Button color="red" onClick={deletePlayer}>
                Delete Player
            </Button>
        </div>
    )
}
