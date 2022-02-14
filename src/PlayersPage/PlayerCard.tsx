import { List } from "semantic-ui-react"

import { Player } from "../models/Player"

interface PlayerCardProps {
    player: Player
    isSelected: boolean
    setSelectedPlayer: (username: string | undefined) => void
}

export const PlayerCard = (props: PlayerCardProps) => {
    let p = props.player

    let className = "player-card"
    if (props.isSelected) {
        className += " selected"
    }

    return (
        <List.Item
            className={className}
            value={p.username}
            onClick={(e, data) => props.setSelectedPlayer(data.value)}>
            <List.Content>
                <List.Header>{p.displayName}</List.Header>
                <List.Description>{p.username}</List.Description>
            </List.Content>
        </List.Item>
    )
}
