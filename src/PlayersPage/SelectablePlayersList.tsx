import { Icon, Menu } from "semantic-ui-react"

import { Player } from "../models/Player"

interface SelectablePlayersListProps {
    players: Player[]
    selectedPlayer: string | undefined
    setSelectedPlayer: (username: string | undefined) => void
}

export const SelectablePlayersList = (props: SelectablePlayersListProps) => (
    <div className="players-list">
        <Menu vertical color="teal">
                <Menu.Item header>
                    <Icon name="user" />
                    Select a player
                </Menu.Item>

                {props.players.map(p => (
                    <Menu.Item
                        key={p.username}
                        active={props.selectedPlayer === p.username}
                        onClick={() => props.setSelectedPlayer(p.username)}>
                        <span className="username">({p.username})</span>
                        <span className="display-name">{p.displayName}&nbsp;</span>
                    </Menu.Item>
                ))}
        </Menu>
    </div>
)
