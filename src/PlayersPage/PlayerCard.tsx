import { Menu } from "semantic-ui-react"

import { Player } from "../models/Player"

interface PlayerCardProps {
    player: Player
    isSelected: boolean
    setSelectedPlayer: (username: string | undefined) => void
}

export const PlayerCard = (props: PlayerCardProps) => {
    let p = props.player

    return (
        <Menu.Item
            active={props.isSelected}
            onClick={() => props.setSelectedPlayer(p.username)}>
            {p.displayName}
        </Menu.Item>
    )
}
