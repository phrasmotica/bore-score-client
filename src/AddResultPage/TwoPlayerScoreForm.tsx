import { useEffect, useState } from "react"
import { Form } from "semantic-ui-react"

import { PlayerScoreInput } from "./PlayerScoreInput"

import { Player } from "../models/Player"

interface TwoPlayerScoreFormProps {
    players: Player[]
    submit: (formData: any) => void
}

export const TwoPlayerScoreForm = (props: TwoPlayerScoreFormProps) => {
    const [winnerId, setWinnerId] = useState(0)
    const [winnerScore, setWinnerScore] = useState(0)
    const [loserId, setLoserId] = useState(0)
    const [loserScore, setLoserScore] = useState(0)

    useEffect(() => {
        if (props.players.length > 1) {
            setWinnerId(props.players[0].id)
            setLoserId(props.players[1].id)
        }
    }, [props.players])

    useEffect(() => {
        if (props.players.length > 1) {
            if (winnerId === loserId) {
                let newLoser = props.players.filter(p => p.id !== winnerId)[0]
                setLoserId(newLoser.id)
            }
        }
    }, [winnerId, loserId, props.players])

    const formIsComplete = () => winnerScore > 0

    const getFormData = () => ({
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
    })

    let winnerOptions = props.players.map(p => ({
        key: p.id,
        text: p.displayName,
        value: p.id,
    }))

    let loserOptions = winnerOptions.filter(o => o.value !== winnerId)

    return (
        <Form onSubmit={() => props.submit(getFormData())}>
            <PlayerScoreInput
                label="Winner"
                playerOptions={winnerOptions}
                playerId={winnerId}
                setPlayerId={setWinnerId}
                score={winnerScore}
                setScore={setWinnerScore} />

            <PlayerScoreInput
                label="Loser"
                playerOptions={loserOptions}
                playerId={loserId}
                setPlayerId={setLoserId}
                score={loserScore}
                setScore={setLoserScore} />

            <Form.Button
                color="teal"
                disabled={!formIsComplete()}>
                Submit
            </Form.Button>
        </Form>
    )
}
