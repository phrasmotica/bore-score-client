import { useEffect, useState } from "react"

import { GameDetails } from "./GameDetails"
import { SelectableGamesList } from "./SelectableGamesList"
import { fetchGames } from "../FetchHelpers"

import { Game } from "../models/Game"

export const GamesPage = () => {
    const [games, setGames] = useState<Game[]>([])
    const [selectedGame, setSelectedGame] = useState<number>()

    const fetchAndSetGames = () => {
        fetchGames().then(setGames)
    }

    useEffect(fetchAndSetGames, [])

    const getSelectedGame = () => games.find(g => g.id === selectedGame)

    const onDeletedGame = () => {
        fetchAndSetGames()
        setSelectedGame(undefined)
    }

    const renderDetails = () => {
        if (selectedGame !== undefined) {
            return (
                <GameDetails
                    game={getSelectedGame()!}
                    onDeletedGame={onDeletedGame} />
            )
        }

        return null
    }

    return (
        <div className="games-page">
            <h2>Games</h2>

            <div className="games-page-body">
                <div className="sidebar">
                    <SelectableGamesList
                        games={games}
                        selectedGame={selectedGame}
                        setSelectedGame={setSelectedGame} />
                </div>

                {renderDetails()}
            </div>
        </div>
    )
}
