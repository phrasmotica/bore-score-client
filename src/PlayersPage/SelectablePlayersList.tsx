import { useState } from "react"
import { Input, Menu } from "semantic-ui-react"

import { Player } from "../models/Player"

interface SelectablePlayersListProps {
    players: Player[]
    selectedPlayer: string | undefined
    setSelectedPlayer: (username: string | undefined) => void
}

export const SelectablePlayersList = (props: SelectablePlayersListProps) => {
    const [searchTerm, setSearchTerm] = useState("")

    const matchesSearchTerm = (p: Player) => {
        return p.username.toLowerCase().includes(searchTerm)
            || p.displayName.toLowerCase().includes(searchTerm)
    }

    let playersToShow = props.players
    if (searchTerm.length > 0) {
        playersToShow = playersToShow.filter(matchesSearchTerm)
    }

    let listItems = playersToShow.map(p => (
        <Menu.Item
            key={p.username}
            active={props.selectedPlayer === p.username}
            onClick={() => props.setSelectedPlayer(p.username)}>
            <span className="username">({p.username})</span>
            <span className="display-name">{p.displayName}&nbsp;</span>
        </Menu.Item>
    ))

    if (searchTerm.length > 0 && playersToShow.length < 1) {
        listItems = [(
            <Menu.Item>
                No matching players!
            </Menu.Item>
        )]
    }

    return (
        <div className="players-list">
            <Menu vertical color="teal">
                <Menu.Item>
                    <Input
                        icon="search"
                        placeholder="Search players..."
                        value={searchTerm}
                        onChange={(e, { value }) => setSearchTerm(value)} />
                </Menu.Item>

                {listItems}
            </Menu>
        </div>
    )
}
