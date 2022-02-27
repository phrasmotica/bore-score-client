import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useSearchParams } from "react-router-dom"
import moment from "moment"

import { CommonForm } from "./CommonForm"
import { CooperativeScoreForm } from "./CooperativeScoreForm"
import { CooperativeWinForm } from "./CooperativeWinForm"
import { IndividualScoreForm } from "./IndividualScoreForm"
import { IndividualWinForm } from "./IndividualWinForm"
import { GameImage } from "../GameImage"

import { fetchGames, fetchPlayers } from "../FetchHelpers"
import { submitValue } from "../MomentHelpers"

import { Game } from "../models/Game"
import { Player } from "../models/Player"
import { WinMethodName } from "../models/WinMethod"

export const AddResultPage = () => {
    const [searchParams] = useSearchParams()

    const [games, setGames] = useState<Game[]>([])
    const [players, setPlayers] = useState<Player[]>([])

    const [game, setGame] = useState<Game>()
    const [timestamp, setTimestamp] = useState(moment())

    useEffect(() => {
        fetchGames()
            .then(setGames)

        fetchPlayers()
            .then(setPlayers)
    }, [])

    useEffect(() => {
        if (games.length > 0) {
            let gameParam = searchParams.get("game")
            let defaultGame = games.find(g => g.name === gameParam) ?? games[0]
            setGame(defaultGame)
        }
    }, [games, searchParams])

    const navigate = useNavigate()

    const renderGameForm = () => {
        switch (game?.winMethod) {
            case WinMethodName.IndividualScore:
                return (
                    <IndividualScoreForm
                        players={players}
                        minPlayerCount={game.minPlayers}
                        maxPlayerCount={game.maxPlayers}
                        submit={submit} />
                )

            case WinMethodName.IndividualWin:
                return (
                    <IndividualWinForm
                        players={players}
                        minPlayerCount={game.minPlayers}
                        maxPlayerCount={game.maxPlayers}
                        submit={submit} />
                )

            case WinMethodName.CooperativeScore:
                return (
                    <CooperativeScoreForm
                        players={players}
                        minPlayerCount={game.minPlayers}
                        maxPlayerCount={game.maxPlayers}
                        submit={submit} />
                )

            case WinMethodName.CooperativeWin:
                return (
                    <CooperativeWinForm
                        players={players}
                        minPlayerCount={game.minPlayers}
                        maxPlayerCount={game.maxPlayers}
                        submit={submit} />
                )
        }

        return null
    }

    const submit = (formData: any) => {
        if (game === undefined) {
            return
        }

        fetch("http://localhost:8000/results", {
            method: "POST",
            body: JSON.stringify({
                gameName: game.name,
                timestamp: submitValue(timestamp),
                ...formData
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(() => navigate("/results"))
    }

    let imageSrc = game?.imageLink || "https://e.snmc.io/i/600/s/9f6d3d17acac6ce20993eb158c203e4b/5662600/godspeed-you-black-emperor-lift-yr-skinny-fists-like-antennas-to-heaven-cover-art.jpg"

    return (
        <div className="add-result-page">
            <h2>Add Result</h2>

            <div className="add-result-page-body">
                <div className="left">
                    <GameImage imageSrc={imageSrc} />
                </div>

                <div className="right">
                    <CommonForm
                        games={games}
                        selectedGame={game}
                        setSelectedGame={setGame}
                        timestamp={timestamp}
                        setTimestamp={setTimestamp} />

                    {renderGameForm()}
                </div>
            </div>
        </div>
    )
}
