import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { GameDetails } from "./GameDetails"
import { SelectableGamesList } from "./SelectableGamesList"
import { fetchGames, fetchLinkTypes, fetchWinMethods } from "../FetchHelpers"

import { Game } from "../models/Game"
import { LinkType } from "../models/LinkType"
import { WinMethod } from "../models/WinMethod"

export const GamesPage = () => {
    const [searchParams] = useSearchParams()

    const [games, setGames] = useState<Game[]>([])
    const [linkTypes, setLinkTypes] = useState<LinkType[]>([])
    const [winMethods, setWinMethods] = useState<WinMethod[]>([])

    const [selectedGame, setSelectedGame] = useState("")

    const fetchAndSetGames = () => {
        fetchGames().then(setGames)
    }

    useEffect(() => {
        fetchAndSetGames()

        fetchLinkTypes()
            .then(setLinkTypes)

        fetchWinMethods()
            .then(setWinMethods)
    }, [])

    useEffect(() => {
        if (games.length > 0) {
            let gameParam = searchParams.get("game")
            let defaultGame = games.find(g => g.name === gameParam) ?? games[0]
            setSelectedGame(defaultGame.name)
        }
    }, [games, searchParams])

    const getSelectedGame = () => games.find(g => g.name === selectedGame)
    const getWinMethod = (game: Game) => winMethods.find(w => game.winMethod === w.name)

    const onDeletedGame = () => {
        fetchAndSetGames()
        setSelectedGame("")
    }

    const renderDetails = () => {
        if (selectedGame.length > 0) {
            let game = getSelectedGame()!
            let winMethod = getWinMethod(game)

            if (winMethod !== undefined) {
                return (
                    <GameDetails
                        game={game}
                        linkTypes={linkTypes}
                        winMethod={winMethod}
                        onDeletedGame={onDeletedGame} />
                )
            }
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
