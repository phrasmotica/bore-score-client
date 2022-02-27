import { useEffect, useState } from "react"

import { GamesTable } from "./GamesTable"

import { fetchGames, fetchWinMethods } from "../FetchHelpers"

import { Game } from "../models/Game"
import { WinMethod } from "../models/WinMethod"

export const GamesPage = () => {
    const [games, setGames] = useState<Game[]>([])
    const [winMethods, setWinMethods] = useState<WinMethod[]>([])

    useEffect(() => {
        fetchGames()
            .then(setGames)

        fetchWinMethods()
            .then(setWinMethods)
    }, [])

    return (
        <div className="games-page">
            <h2>Games</h2>

            <GamesTable games={games} winMethods={winMethods} />
        </div>
    )
}
