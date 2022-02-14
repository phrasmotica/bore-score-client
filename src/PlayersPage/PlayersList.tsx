import { List } from "semantic-ui-react"

import { PlayerCard } from "./PlayerCard"

import { Player } from "../models/Player"

interface PlayersListProps {
    players: Player[]
    selectedPlayer: string | undefined
    setSelectedPlayer: (username: string | undefined) => void
    setAddPlayer: () => void
}

export const PlayersList = (props: PlayersListProps) => (
    <div className="players-list">
        <List divided relaxed selection>
            <List.Item onClick={props.setAddPlayer}>
                <List.Content>
                    <List.Content>Add Player</List.Content>
                </List.Content>
            </List.Item>

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
