import { useState } from "react"
import { Input, Menu } from "semantic-ui-react"

import { Player } from "./models/Player"

interface PlayersListProps {
    players: Player[]
}

export const PlayersList = (props: PlayersListProps) => {
    const [searchTerm, setSearchTerm] = useState("")

    const matchesSearchTerm = (p: Player) => p.username.includes(searchTerm) || p.displayName.includes(searchTerm)

    let playersToShow = props.players
    if (searchTerm.length > 0) {
        playersToShow = playersToShow.filter(matchesSearchTerm)
    }

    let listItems = playersToShow.map(p => (
        <Menu.Item key={p.username}>
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
            <Menu vertical>
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
