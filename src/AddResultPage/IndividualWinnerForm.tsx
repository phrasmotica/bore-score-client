import { useEffect, useState } from "react"
import { Button, Form, Icon } from "semantic-ui-react"

import { PlayerWinnerInput } from "./PlayerWinnerInput"

import { Player } from "../models/Player"
import { getPlayerIdsToUse, replaceDuplicates } from "../Helpers"

interface IndividualWinnerFormProps {
    players: Player[]
    minPlayerCount: number
    maxPlayerCount: number
    submit: (formData: any) => void
}

export const IndividualWinnerForm = (props: IndividualWinnerFormProps) => {
    const [playerIds, setPlayerIds] = useState<number[]>([])
    const [winnerIndex, setWinnerIndex] = useState(0)

    useEffect(() => {
        // fill current player inputs with first N (<= minPlayerCount) players
        let playerIdsToUse = getPlayerIdsToUse(props.players.map(p => p.id), props.minPlayerCount)
        setPlayerIds(playerIdsToUse)
    }, [props.players, props.minPlayerCount])

    const formIsComplete = () => playerIds.length > 0 && new Set(playerIds).size === playerIds.length

    const getFormData = () => ({
        scores: playerIds.map((playerId, i) => ({
            playerId: playerId,
            isWinner: i === winnerIndex,
        }))
    })

    let playerOptions = props.players.map(p => ({
        key: p.id,
        text: p.displayName,
        value: p.id,
    }))

    const setPlayerId = (index: number, newId: number) => {
        let newPlayerIds = playerIds.map((id, i) => (i === index) ? newId : id)

        // if we have a duplicate of the new player ID elsewhere in the list
        // then replace the duplicates with player IDs from the previous set
        // that are now unused
        let unusedPlayerIds = playerIds.filter(id => !newPlayerIds.includes(id))
        let deduplicatedPlayerIds = replaceDuplicates(newPlayerIds, index, unusedPlayerIds)

        setPlayerIds(deduplicatedPlayerIds)
    }

    const canAddPlayer = () => playerIds.length < Math.min(props.players.length, props.maxPlayerCount)

    const addPlayer = () => {
        let nextPlayerId = props.players.find(p => !playerIds.includes(p.id))?.id ?? 0
        setPlayerIds([...playerIds, nextPlayerId])
    }

    const removePlayer = (index: number) => {
        let newPlayerIds = [...playerIds]
        newPlayerIds.splice(index, 1)
        setPlayerIds(newPlayerIds)
    }

    return (
        <div>
            <Button.Group widths={2}>
                <Button
                    icon
                    className="add-player-button"
                    color="yellow"
                    disabled={!canAddPlayer()}
                    onClick={addPlayer}>
                    <span>Add Player&nbsp;</span>
                    <Icon name="plus" />
                </Button>

                <Button
                    icon
                    className="submit-button"
                    color="teal"
                    disabled={!formIsComplete()}
                    onClick={() => props.submit(getFormData())}>
                    <span>Submit Result&nbsp;</span>
                    <Icon name="check" />
                </Button>
            </Button.Group>

            <Form>
                {playerIds.map((playerId, i) => (
                    <div key={i} className="player-winner-input-removable">
                        <PlayerWinnerInput
                            key={i}
                            label={`Player ${i + 1}`}
                            playerOptions={playerOptions}
                            playerId={playerId}
                            setPlayerId={id => setPlayerId(i, id)}
                            isWinner={i === winnerIndex}
                            setIsWinner={() => setWinnerIndex(i)} />

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
        </div>
    )
}
