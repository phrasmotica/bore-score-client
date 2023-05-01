import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import { GameDetails } from "./GameDetails"

import { resetTitle, setTitle } from "../Helpers"
import { useGame, useLinkTypes, useWinMethods } from "../QueryHelpers"

interface GameDetailsPageProps {

}

export const GameDetailsPage = (props: GameDetailsPageProps) => {
    let { name } = useParams()

    const { data: game } = useGame(name || "")
    const { data: linkTypes } = useLinkTypes()
    const { data: winMethods } = useWinMethods()

    useEffect(() => {
        if (game?.displayName) {
            setTitle("BoreScore - " + game.displayName)
        }
        else {
            resetTitle()
        }
    }, [game])

    if (game === undefined || !linkTypes || linkTypes.length <= 0) {
        return null
    }

    let winMethod = winMethods?.find(w => game.winMethod === w.name)
    if (winMethod === undefined) {
        return null
    }

    return (
        <div className="game-details-page">
            <div className="header">
                <Link to="/games">
                    <span>&larr;&nbsp;Back to games list</span>
                </Link>
            </div>

            <GameDetails
                game={game}
                linkTypes={linkTypes}
                winMethod={winMethod} />
        </div>
    )
}
