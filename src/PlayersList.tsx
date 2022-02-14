import { List } from "semantic-ui-react"

import { Player } from "./Player"
import { PlayerCard } from "./PlayerCard"

interface PlayersListProps {
    players: Player[]
    selectedPlayer: string | undefined
    setSelectedPlayer: (username: string | undefined) => void
}

export const PlayersList = (props: PlayersListProps) => (
    <div className="players-list">
        <List divided relaxed selection>
            {props.players.map(p => (
                <PlayerCard
                    key={p.username}
                    player={p}
                    setSelectedPlayer={props.setSelectedPlayer}
                    isSelected={props.selectedPlayer === p.username} />
            ))}
        </List>
    </div>
)
