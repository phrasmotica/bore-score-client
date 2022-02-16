import { useCallback, useEffect, useState } from "react"
import { Button, Form, Icon } from "semantic-ui-react"

import { PlayerScoreInput } from "./PlayerScoreInput"

import { Player } from "../models/Player"

interface PlayerScoreFormProps {
    players: Player[]
    minPlayerCount: number
    maxPlayerCount: number
    setFormData: (formData: any) => void
    setFormIsComplete: (isComplete: boolean) => void
}

export const PlayerScoreForm = (props: PlayerScoreFormProps) => {
    const [playerIds, setPlayerIds] = useState<number[]>([])
    const [playerScores, setPlayerScores] = useState<number[]>([])

    useEffect(() => {
        // fill current player inputs with first N players,
        // clamping N between minPlayerCount and maxPlayerCount
        let playerIdsToUse = props.players.map(p => p.id)
        let effectivePlayerCount = Math.max(props.minPlayerCount, Math.min(props.maxPlayerCount, playerIds.length))
        let emptySlots = effectivePlayerCount - playerIdsToUse.length

        if (emptySlots > 0) {
            playerIdsToUse = playerIdsToUse.concat(new Array(emptySlots).fill(0))
        }
        else {
            playerIdsToUse = playerIdsToUse.slice(0, effectivePlayerCount)
        }

        setPlayerIds(playerIdsToUse)
        setPlayerScores(playerIdsToUse.map(_ => 0))
    }, [props.players, props.minPlayerCount, props.maxPlayerCount, playerIds.length])

    const formIsComplete = useCallback(() => playerIds.length > 0 && new Set(playerIds).size === playerIds.length, [playerIds])

    const getFormData = useCallback(() => ({
        scores: playerIds.map((playerId, i) => ({
            playerId: playerId,
            score: playerScores[i],
        }))
    }), [playerIds, playerScores])

    useEffect(() => {
        props.setFormData(getFormData())
        props.setFormIsComplete(formIsComplete())
    }, [props, getFormData, formIsComplete, playerIds, playerScores])

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
        <div>
            <Form>
                {playerIds.map((playerId, i) => (
                    <div key={i} className="player-score-input-removable">
                        <PlayerScoreInput
                            key={i}
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
                ))}
            </Form>

            <Button
                icon
                className="add-player-button"
                color="yellow"
                disabled={playerIds.length >= props.maxPlayerCount}
                onClick={addPlayer}>
                <span>Add Player&nbsp;</span>
                <Icon name="plus" />
            </Button>
        </div>
    )
}
