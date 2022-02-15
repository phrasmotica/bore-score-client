import { Icon, Menu } from "semantic-ui-react"

import { Game } from "../models/Game"

interface GameSelectMenuProps {
    games: Game[]
    selectedGame: number
    setSelectedGame: (id: number) => void
}

export const GameSelectMenu = (props: GameSelectMenuProps) => (
    <div className="game-select-menu">
        <Menu vertical>
            <Menu.Item header>
                <Icon name="game" />
                Game
            </Menu.Item>

            {props.games.map(g => (
                <Menu.Item
                    active={props.selectedGame === g.id}
                    color="teal"
                    onClick={() => props.setSelectedGame(g.id)}>
                    {g.name}
                </Menu.Item>
            ))}
        </Menu>
    </div>
)
