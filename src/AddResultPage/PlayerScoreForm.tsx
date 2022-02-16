import { useEffect, useState } from "react"
import { Button, Form, Icon } from "semantic-ui-react"

import { PlayerScoreInput } from "./PlayerScoreInput"

import { Player } from "../models/Player"

interface PlayerScoreFormProps {
    players: Player[]
    minPlayerCount: number
    maxPlayerCount: number
    submit: (formData: any) => void
}

export const PlayerScoreForm = (props: PlayerScoreFormProps) => {
    const [playerIds, setPlayerIds] = useState<number[]>([])
    const [playerScores, setPlayerScores] = useState<number[]>([])

    // fill current player inputs with first N players
    useEffect(() => {
        let effectivePlayerCount = Math.max(props.minPlayerCount, getPlayerCount()) // avoids getPlayerCount() === 0
        let playersToUse = props.players

        if (playersToUse.length > effectivePlayerCount) {
            playersToUse = playersToUse.slice(0, effectivePlayerCount)
        }

        setPlayerIds(playersToUse.map(p => p.id))
        setPlayerScores(playersToUse.map(_ => 0))
    }, [props.players])

    const getPlayerCount = () => playerIds.length

    const formIsComplete = () => getPlayerCount() > 0 && new Set(playerIds).size === playerIds.length

    const getFormData = () => ({
        scores: playerIds.map((playerId, i) => ({
            playerId: playerId,
            score: playerScores[i],
        }))
    })

    let playerOptions = props.players.map(p => ({
        key: p.id,
        text: p.displayName,
        value: p.id,
    }))

    const setPlayerId = (index: number, newId: number) => {
        setPlayerIds(playerIds.map((id, i) => (i === index) ? newId : id))
    }

    const setPlayerScore = (index: number, newScore: number) => {
        setPlayerScores(playerScores.map((score, i) => (i === index) ? newScore : score))
    }

    const addPlayer = () => {
        let nextPlayerId = props.players.find(p => !playerIds.includes(p.id))?.id ?? 0
        setPlayerIds([...playerIds, nextPlayerId])
        setPlayerScores([...playerScores, 0])
    }

    const removePlayer = (index: number) => {
        let newPlayerIds = [...playerIds]
        newPlayerIds.splice(index, 1)
        setPlayerIds(newPlayerIds)

        let newPlayerScores = [...playerScores]
        newPlayerScores.splice(index, 1)
        setPlayerScores(newPlayerScores)
    }

    return (
        <div className="form-container">
            <Form>
                {playerIds.map((playerId, i) => {
                    return (
                        <div className="player-score-input-removable">
                            <PlayerScoreInput
                                label={`Player ${i + 1}`}
                                playerOptions={playerOptions}
                                playerId={playerId}
                                setPlayerId={id => setPlayerId(i, id)}
                                score={playerScores[i]}
                                setScore={score => setPlayerScore(i, score)} />

                            <Button
                                icon
                                inverted
                                color="red"
                                onClick={() => removePlayer(i)}
                                disabled={i < props.minPlayerCount}>
                                <Icon name="minus" />
                            </Button>
                        </div>
                    )
                })}
            </Form>

            <div className="add-player-button">
                <Button
                    icon
                    color="yellow"
                    disabled={getPlayerCount() >= props.maxPlayerCount}
                    onClick={addPlayer}>
                    <span>Add Player&nbsp;</span>
                    <Icon name="plus" />
                </Button>
            </div>

            <div>
                <Button
                    icon
                    color="teal"
                    disabled={!formIsComplete()}
                    onClick={() => props.submit(getFormData())}>
                    <span>Submit Result&nbsp;</span>
                    <Icon name="check" />
                </Button>
            </div>
        </div>
    )
}
