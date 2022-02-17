import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import moment from "moment"

import { CommonForm } from "./CommonForm"
import { PlayerScoreForm } from "./PlayerScoreForm"

import { fetchGames, fetchPlayers } from "../FetchHelpers"
import { submitValue } from "../MomentHelpers"

import { Game, WinMethod } from "../models/Game"
import { Player } from "../models/Player"

export const AddResultPage = () => {
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
            setGame(games[0])
        }
    }, [games])

    const navigate = useNavigate()

    const renderGameForm = () => {
        if (game?.winMethod === WinMethod.IndividualScore) {
            return (
                <PlayerScoreForm
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
                gameId: game.id,
                timestamp: submitValue(timestamp),
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

            <CommonForm
                games={games}
                selectedGame={game}
                setSelectedGame={setGame}
                timestamp={timestamp}
                setTimestamp={setTimestamp} />

            {renderGameForm()}
        </div>
    )
}
