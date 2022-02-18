import { Icon, Menu } from "semantic-ui-react"

import { GameCard } from "./GameCard"

import { Game } from "../models/Game"
import { Result } from "../models/Result"

interface GameFilterMenuProps {
    games: Game[]
    results: Result[]
    selectedGame: number | undefined
    setSelectedGame: (id: number | undefined) => void
}

export const GameFilterMenu = (props: GameFilterMenuProps) => {
    const toggleSelectedGame = (id: number) => {
        if (props.selectedGame === id) {
            props.setSelectedGame(undefined)
        }
        else {
            props.setSelectedGame(id)
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
                    let resultCount = props.results.filter(r => r.gameId === g.id)

                    return (
                        <GameCard
                            key={g.id}
                            game={g}
                            resultCount={resultCount.length}
                            setSelectedGame={() => toggleSelectedGame(g.id)}
                            isSelected={props.selectedGame === g.id} />
                    )
                })}
            </Menu>
        </div>
    )
}
