import { Dropdown } from "semantic-ui-react"

import { Game } from "../models/Game"
import { Result } from "../models/Result"

interface GameFilterDropdownProps {
    games: Game[]
    results: Result[]
    selectedGames: string[]
    setSelectedGames: (names: string[]) => void
}

export const GameFilterDropdown = (props: GameFilterDropdownProps) => {
    const getCount = (name: string) => props.results.filter(r => r.gameName === name).length

    const options = props.games.map(g => ({
        key: g.name,
        text: g.displayName + ` (${getCount(g.name)})`,
        value: g.name,
        disabled: getCount(g.name) <= 0,
    }))

    return (
        <div className="game-filter-dropdown">
            <Dropdown
                fluid
                multiple
                clearable
                selection
                search
                placeholder="Filter by game"
                onChange={(_, data) => props.setSelectedGames(data.value as string[])}
                options={options}

                // this should never happen but it's here for completeness
                disabled={options.every(o => o.disabled)} />
        </div>
    )
}
