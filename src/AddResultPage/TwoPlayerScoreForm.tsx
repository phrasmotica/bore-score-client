import { useEffect, useState } from "react"
import { Form } from "semantic-ui-react"

import { PlayerScoreInput } from "./PlayerScoreInput"

import { Player } from "../models/Player"

interface TwoPlayerScoreFormProps {
    players: Player[]
    submit: (formData: any) => void
}

export const TwoPlayerScoreForm = (props: TwoPlayerScoreFormProps) => {
    const [playerOneId, setPlayerOneId] = useState<number>()
    const [playerOneScore, setPlayerOneScore] = useState(0)
    const [playerTwoId, setPlayerTwoId] = useState<number>()
    const [playerTwoScore, setPlayerTwoScore] = useState(0)

    useEffect(() => {
        if (props.players.length > 1) {
            setPlayerOneId(props.players[0].id)
            setPlayerTwoId(props.players[1].id)
        }
    }, [props.players])

    useEffect(() => {
        if (props.players.length > 1) {
            if (playerOneId === playerTwoId) {
                let newPlayerTwo = props.players.filter(p => p.id !== playerOneId)[0]
                setPlayerTwoId(newPlayerTwo.id)
            }
        }
    }, [playerOneId, playerTwoId, props.players])

    const formIsComplete = () => playerOneId !== undefined && playerTwoId !== undefined

    const getFormData = () => ({
        scores: [
            {
                playerId: playerOneId,
                score: playerOneScore,
            },
            {
                playerId: playerTwoId,
                score: playerTwoScore,
            },
        ]
    })

    let playerOneOptions = props.players.map(p => ({
        key: p.id,
        text: p.displayName,
        value: p.id,
    }))

    let playerTwoOptions = playerOneOptions.filter(o => o.value !== playerOneId)

    return (
        <Form onSubmit={() => props.submit(getFormData())}>
            <PlayerScoreInput
                label="Player 1"
                playerOptions={playerOneOptions}
                playerId={playerOneId}
                setPlayerId={setPlayerOneId}
                score={playerOneScore}
                setScore={setPlayerOneScore} />

            <PlayerScoreInput
                label="Player 2"
                playerOptions={playerTwoOptions}
                playerId={playerTwoId}
                setPlayerId={setPlayerTwoId}
                score={playerTwoScore}
                setScore={setPlayerTwoScore} />

            <Form.Button
                color="teal"
                disabled={!formIsComplete()}>
                Submit
            </Form.Button>
        </Form>
    )
}
