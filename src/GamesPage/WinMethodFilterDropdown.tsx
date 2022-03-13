import { Dropdown } from "semantic-ui-react"

import { Game } from "../models/Game"
import { WinMethod } from "../models/WinMethod"

interface WinMethodFilterDropdownProps {
    winMethods: WinMethod[]
    games: Game[]
    selectedWinMethods: string[]
    setSelectedWinMethods: (names: string[]) => void
}

export const WinMethodFilterDropdown = (props: WinMethodFilterDropdownProps) => {
    const getCount = (name: string) => props.games.filter(g => g.winMethod === name).length

    const options = props.winMethods.map(w => ({
        key: w.name,
        text: w.displayName + ` (${getCount(w.name)})`,
        value: w.name,
        disabled: getCount(w.name) <= 0,
    }))

    return (
        <div className="win-method-filter-dropdown">
            <Dropdown
                fluid
                multiple
                clearable
                selection
                search
                placeholder="Filter by win method"
                onChange={(_, data) => props.setSelectedWinMethods(data.value as string[])}
                options={options} />
        </div>
    )
}
