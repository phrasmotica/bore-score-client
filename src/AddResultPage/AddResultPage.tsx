import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Form } from "semantic-ui-react"
import moment from "moment"

import { DateTimePicker } from "./DateTimePicker"
import { GamePicker } from "./GamePicker"
import { PlayerScoreForm } from "./PlayerScoreForm"

import { fetchGames, fetchPlayers } from "../FetchHelpers"
import { submitValue } from "../MomentHelpers"

import { Game, GameType } from "../models/Game"
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

    const renderForm = () => {
        if (game?.gameType === GameType.Score) {
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

            <div className="add-result-form">
                <Form>
                    <GamePicker games={games} selectedGame={game} setSelectedGame={setGame} />
                    <DateTimePicker dateTime={timestamp} setDateTime={setTimestamp} />
                </Form>

                {renderForm()}
            </div>
        </div>
    )
}
