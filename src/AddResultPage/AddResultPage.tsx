import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import { GameSelectMenu } from "./GameSelectMenu"
import { TwoPlayerScoreForm } from "./TwoPlayerScoreForm"
import { fetchGames, fetchPlayers } from "../FetchHelpers"

import { Game } from "../models/Game"
import { Player } from "../models/Player"

export const AddResultPage = () => {
    const [games, setGames] = useState<Game[]>([])
    const [players, setPlayers] = useState<Player[]>([])

    const [gameId, setGameId] = useState(0)

    useEffect(() => {
        fetchGames()
            .then(setGames)

        fetchPlayers()
            .then(setPlayers)
    }, [])

    useEffect(() => {
        if (games.length > 0) {
            setGameId(games[0].id)
        }
    }, [games])

    const navigate = useNavigate()

    const submit = (formData: any) => {
        fetch("http://localhost:8000/results", {
            method: "POST",
            body: JSON.stringify({
                gameId: gameId,
                ...formData
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(() => navigate("/results"))
    }

    return (
        <div className="add-result-page">
            <h2>Add Result</h2>

            <div className="add-result-form">
                <div className="sidebar">
                    <GameSelectMenu games={games} selectedGame={gameId} setSelectedGame={setGameId} />
                </div>

                <TwoPlayerScoreForm players={players} submit={submit} />
            </div>
        </div>
    )
}
