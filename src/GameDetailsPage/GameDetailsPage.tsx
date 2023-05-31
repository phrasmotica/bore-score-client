import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-semantic-toasts"

import { GameDetails } from "./GameDetails"

import { resetTitle, setTitle } from "../Helpers"
import { useGame, useLinkTypes, useWinMethods } from "../QueryHelpers"

export const GameDetailsPage = () => {
    let { gameId } = useParams()

    const navigate = useNavigate()

    const { data: game } = useGame(gameId || "", error => {
        if (error.isNotFound()) {
            gameNotFoundToast()
            navigate("/games")
        }
    })

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

const gameNotFoundToast = () => toast({
    title: "",
    description: "That game does not exist.",
    color: "red",
    icon: "delete",
})
