import { Icon, Menu } from "semantic-ui-react"

import { PlayerCard } from "./PlayerCard"

import { Player } from "../models/Player"

interface PlayersListProps {
    players: Player[]
    selectedPlayer: string | undefined
    setSelectedPlayer: (username: string | undefined) => void
}

export const PlayersList = (props: PlayersListProps) => (
    <div className="players-menu">
        <Menu vertical color="teal">
                <Menu.Item header>
                    <Icon name="user" />
                    Select a player
                </Menu.Item>

                {props.players.map(p => (
                <PlayerCard
                    key={p.username}
                    player={p}
                    setSelectedPlayer={props.setSelectedPlayer}
                    isSelected={props.selectedPlayer === p.username} />
            ))}
        </Menu>
    </div>
)
