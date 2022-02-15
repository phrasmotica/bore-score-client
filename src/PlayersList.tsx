import { Icon, Menu } from "semantic-ui-react"

import { Player } from "./models/Player"

interface PlayersListProps {
    players: Player[]
}

export const PlayersList = (props: PlayersListProps) => (
    <div className="players-list">
        <Menu vertical>
            <Menu.Item header>
                <Icon name="user" />
                Existing players
            </Menu.Item>

            {props.players.map(p => (
                <Menu.Item key={p.username}>
                    <span className="username">({p.username})</span>
                    <span className="display-name">{p.displayName}&nbsp;</span>
                </Menu.Item>
            ))}
        </Menu>
    </div>
)
