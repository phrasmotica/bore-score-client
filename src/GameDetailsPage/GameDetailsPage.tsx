import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { GameDetails } from "./GameDetails"

import { fetchGame, fetchLinkTypes, fetchWinMethods } from "../FetchHelpers"

import { Game } from "../models/Game"
import { LinkType } from "../models/LinkType"
import { WinMethod } from "../models/WinMethod"

interface GameDetailsPageProps {

}

export const GameDetailsPage = (props: GameDetailsPageProps) => {
    const [game, setGame] = useState<Game>()
    const [linkTypes, setLinkTypes] = useState<LinkType[]>([])
    const [winMethods, setWinMethods] = useState<WinMethod[]>([])

    let { name } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        fetchLinkTypes()
            .then(setLinkTypes)

        fetchWinMethods()
            .then(setWinMethods)
    }, [])

    useEffect(() => {
        if (name !== undefined) {
            fetchGame(name)
                .then(setGame)
        }
    }, [name])

    if (game === undefined || linkTypes.length <= 0) {
        return null
    }

    let winMethod = winMethods.find(w => game.winMethod === w.name)

    if (winMethod === undefined) {
        return null
    }

    return (
        <div className="game-details-page">
            <div className="header">
                <a href="/games">
                    <span>&larr;&nbsp;Back to games list</span>
                </a>
            </div>

            <GameDetails
                game={game}
                linkTypes={linkTypes}
                winMethod={winMethod}
                onDeletedGame={() => navigate("/games")} />
        </div>
    )
}
