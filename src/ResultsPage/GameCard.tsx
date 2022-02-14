import { Label, Menu } from "semantic-ui-react"

import { Game } from "../models/Game"

interface GameCardProps {
    game: Game
    resultCount: number
    isSelected: boolean
    setSelectedGame: (id: number | undefined) => void
}

export const GameCard = (props: GameCardProps) => {
    let g = props.game

    let isActive = props.isSelected

    return (
        <Menu.Item
            active={isActive}
            onClick={() => props.setSelectedGame(g.id)}>
            <Label color={isActive ? "teal" : "grey"}>{props.resultCount}</Label>
            {g.name}
        </Menu.Item>
    )
}
