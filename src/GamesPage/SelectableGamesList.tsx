import { useState } from "react"
import { Input, Menu } from "semantic-ui-react"

import { Game } from "../models/Game"

interface SelectableGamesListProps {
    games: Game[]
    selectedGame: string
    setSelectedGame: (name: string) => void
}

export const SelectableGamesList = (props: SelectableGamesListProps) => {
    const [searchTerm, setSearchTerm] = useState("")

    const matchesSearchTerm = (g: Game) => g.displayName.toLowerCase().includes(searchTerm)

    let gamesToShow = props.games
    if (searchTerm.length > 0) {
        gamesToShow = gamesToShow.filter(matchesSearchTerm)
    }

    let listItems = gamesToShow.map(g => (
        <Menu.Item
            key={g.name}
            active={props.selectedGame === g.name}
            onClick={() => props.setSelectedGame(g.name)}>
            <span className="display-name">{g.displayName}</span>
        </Menu.Item>
    ))

    if (searchTerm.length > 0 && gamesToShow.length < 1) {
        listItems = [
            <Menu.Item>
                No matching games!
            </Menu.Item>
        ]
    }

    return (
        <div className="games-list">
            <Menu vertical color="teal">
                <Menu.Item>
                    <Input
                        icon="search"
                        placeholder="Search games..."
                        value={searchTerm}
                        onChange={(e, { value }) => setSearchTerm(value)} />
                </Menu.Item>

                {listItems}
            </Menu>
        </div>
    )
}
