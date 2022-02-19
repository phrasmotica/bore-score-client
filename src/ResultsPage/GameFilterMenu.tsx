import { Icon, Menu } from "semantic-ui-react"

import { GameCard } from "./GameCard"

import { Game } from "../models/Game"
import { Result } from "../models/Result"

interface GameFilterMenuProps {
    games: Game[]
    results: Result[]
    selectedGame: string
    setSelectedGame: (name: string) => void
}

export const GameFilterMenu = (props: GameFilterMenuProps) => {
    const toggleSelectedGame = (name: string) => {
        if (props.selectedGame === name) {
            props.setSelectedGame("")
        }
        else {
            props.setSelectedGame(name)
        }
    }

    return (
        <div className="games-menu">
            <Menu vertical color="teal">
                <Menu.Item header>
                    <Icon name="filter" />
                    Filter by game
                </Menu.Item>

                {props.games.map(g => {
                    let resultCount = props.results.filter(r => r.gameName === g.name)

                    return (
                        <GameCard
                            key={g.name}
                            game={g}
                            resultCount={resultCount.length}
                            setSelectedGame={() => toggleSelectedGame(g.name)}
                            isSelected={props.selectedGame === g.name} />
                    )
                })}
            </Menu>
        </div>
    )
}
