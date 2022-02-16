import { Form } from "semantic-ui-react"

import { Game } from "../models/Game"

interface GamePickerProps {
    games: Game[]
    selectedGame: Game | undefined
    setSelectedGame: (id: Game | undefined) => void
}

export const GamePicker = (props: GamePickerProps) => {
    let gameOptions = props.games.map(g => ({
        key: g.id,
        text: g.name,
        value: g.id,
    }))

    let setSelectedGame = (id: number | undefined) => {
        let game = props.games.find(g => g.id === id)
        props.setSelectedGame(game)
    }

    return (
        <Form.Dropdown
            search
            selection
            label="Game"
            placeholder="Select game..."
            options={gameOptions}
            value={props.selectedGame?.id ?? 0}
            onChange={(e, { value }) => setSelectedGame(Number(value))} />
    )
}
