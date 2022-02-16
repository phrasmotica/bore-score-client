import { Icon, Menu } from "semantic-ui-react"

import { Game } from "../models/Game"

interface GameSelectMenuProps {
    games: Game[]
    selectedGame: Game | undefined
    setSelectedGame: (game: Game) => void
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
                    key={g.id}
                    active={props.selectedGame?.id === g.id}
                    color="teal"
                    onClick={() => props.setSelectedGame(g)}>
                    {g.name}
                </Menu.Item>
            ))}
        </Menu>
    </div>
)
