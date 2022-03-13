import { Dropdown } from "semantic-ui-react"

import { Game } from "../models/Game"

interface GameFilterDropdownProps {
    games: Game[]
    selectedGames: string[]
    setSelectedGames: (names: string[]) => void
}

export const GameFilterDropdown = (props: GameFilterDropdownProps) => {
    const options = props.games.map(g => ({
        key: g.name,
        text: g.displayName,
        value: g.name,
    }))

    return (
        <div className="game-filter-dropdown">
            <Dropdown
                fluid
                multiple
                selection
                placeholder="Filter by game"
                onChange={(_, data) => props.setSelectedGames(data.value as string[])}
                options={options} />
        </div>
    )
}
