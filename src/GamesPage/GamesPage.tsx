import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { GameDetails } from "./GameDetails"
import { SelectableGamesList } from "./SelectableGamesList"
import { fetchGames } from "../FetchHelpers"

import { Game } from "../models/Game"

export const GamesPage = () => {
    const [searchParams] = useSearchParams()

    const [games, setGames] = useState<Game[]>([])
    const [selectedGame, setSelectedGame] = useState("")

    const fetchAndSetGames = () => {
        fetchGames().then(setGames)
    }

    useEffect(fetchAndSetGames, [])

    useEffect(() => {
        if (games.length > 0) {
            let gameParam = searchParams.get("game")
            let defaultGame = games.find(g => g.name === gameParam) ?? games[0]
            setSelectedGame(defaultGame.name)
        }
    }, [games, searchParams])

    const getSelectedGame = () => games.find(g => g.name === selectedGame)

    const onDeletedGame = () => {
        fetchAndSetGames()
        setSelectedGame("")
    }

    const renderDetails = () => {
        if (selectedGame.length > 0) {
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
