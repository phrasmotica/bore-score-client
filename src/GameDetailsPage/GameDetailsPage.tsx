import { Link, useNavigate, useParams } from "react-router-dom"

import { GameDetails } from "./GameDetails"

import { useGame, useLinkTypes, useWinMethods } from "../FetchHelpers"

interface GameDetailsPageProps {

}

export const GameDetailsPage = (props: GameDetailsPageProps) => {
    let { name } = useParams()

    const { game } = useGame(name)
    const { linkTypes } = useLinkTypes()
    const { winMethods } = useWinMethods()

    const navigate = useNavigate()

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
                <Link to="/games">
                    <span>&larr;&nbsp;Back to games list</span>
                </Link>
            </div>

            <GameDetails
                game={game}
                linkTypes={linkTypes}
                winMethod={winMethod}
                onDeletedGame={() => navigate("/games")} />
        </div>
    )
}
