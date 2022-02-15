import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Form } from "semantic-ui-react"

import { fetchGames, fetchPlayers } from "../FetchHelpers"

import { Game } from "../models/Game"
import { Player } from "../models/Player"

export const AddResultPage = () => {
    const [games, setGames] = useState<Game[]>([])
    const [players, setPlayers] = useState<Player[]>([])

    const [gameId, setGameId] = useState(0)
    const [winnerId, setWinnerId] = useState(0)
    const [winnerScore, setWinnerScore] = useState(0)
    const [loserId, setLoserId] = useState(0)
    const [loserScore, setLoserScore] = useState(0)

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

    useEffect(() => {
        if (players.length > 1) {
            setWinnerId(players[0].id)
            setLoserId(players[1].id)
        }
    }, [players])

    useEffect(() => {
        if (players.length > 1) {
            if (winnerId === loserId) {
                let newLoser = players.filter(p => p.id !== winnerId)[0]
                setLoserId(newLoser.id)
            }
        }
    }, [winnerId, loserId, players])

    const navigate = useNavigate()

    const formIsComplete = () => winnerScore > 0

    const submit = () => {
        fetch("http://localhost:8000/results", {
            method: "POST",
            body: JSON.stringify({
                gameId: gameId,
                scores: [
                    {
                        playerId: winnerId,
                        score: winnerScore,
                    },
                    {
                        playerId: loserId,
                        score: loserScore,
                    },
                ]
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(() => navigate("/results"))
    }

    let gameOptions = games.map(g => ({
        key: g.id,
        text: g.name,
        value: g.id,
    }))

    let winnerOptions = players.map(p => ({
        key: p.id,
        text: p.displayName,
        value: p.id,
    }))

    let loserOptions = winnerOptions.filter(o => o.value !== winnerId)

    return (
        <div className="add-result-page">
            <div className="add-result">
                <h2>Add Result</h2>

                <Form onSubmit={submit}>
                    <Form.Field>
                        <Form.Select
                            fluid
                            label="Game"
                            placeholder="Game"
                            options={gameOptions}
                            value={gameId}
                            onChange={(e, { value }) => setGameId(Number(value))} />
                    </Form.Field>

                    <Form.Group widths="equal">
                        <Form.Field>
                            <Form.Select
                                fluid
                                label="Winner"
                                placeholder="Winner"
                                options={winnerOptions}
                                value={winnerId}
                                onChange={(e, { value }) => setWinnerId(Number(value))} />
                        </Form.Field>

                        <Form.Input
                            fluid
                            label="Score"
                            type="number"
                            value={winnerScore}
                            min={0}
                            onChange={(e, { value }) => setWinnerScore(Number(value))} />
                    </Form.Group>

                    <Form.Group widths="equal">
                        <Form.Field>
                            <Form.Select
                                fluid
                                label="Loser"
                                placeholder="Loser"
                                options={loserOptions}
                                value={loserId}
                                onChange={(e, { value }) => setLoserId(Number(value))} />
                        </Form.Field>

                        <Form.Input
                            fluid
                            label="Score"
                            type="number"
                            value={loserScore}
                            min={0}
                            max={winnerScore - 1}
                            onChange={(e, { value }) => setLoserScore(Number(value))} />
                    </Form.Group>

                    <Form.Button
                        color="teal"
                        disabled={!formIsComplete()}>
                        Submit
                    </Form.Button>
                </Form>
            </div>
        </div>
    )
}
