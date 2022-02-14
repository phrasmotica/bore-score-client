import { Player } from "./Player"

interface PlayerDetailsProps {
    player: Player | undefined
}

export const PlayerDetails = (props: PlayerDetailsProps) => {
    return (
        <div className="player-details">
            <h2>{props.player?.displayName ?? "No player selected"}</h2>
        </div>
    )
}
