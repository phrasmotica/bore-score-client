import { useEffect, useState } from "react"
import { Button, Form, Icon } from "semantic-ui-react"

import { PlayerCountWarning } from "./PlayerCountWarning"
import { PlayerScoreInput } from "./PlayerScoreInput"

import { getPlayersToUse, replaceDuplicates } from "../Helpers"

import { Player } from "../models/Player"

interface PlayerScoreFormProps {
    players: Player[]
    minPlayerCount: number
    maxPlayerCount: number
    submit: (formData: any) => void
}

export const PlayerScoreForm = (props: PlayerScoreFormProps) => {
    const [players, setPlayers] = useState<string[]>([])
    const [playerScores, setPlayerScores] = useState<number[]>([])

    useEffect(() => {
        // fill current player inputs with first N (<= minPlayerCount) players
        let playersToUse = getPlayersToUse(props.players.map(p => p.username), props.minPlayerCount)

        setPlayers(playersToUse)
        setPlayerScores(playersToUse.map(_ => 0))
    }, [props.players, props.minPlayerCount])

    const formIsComplete = () => players.length > 0 && new Set(players).size === players.length

    const getFormData = () => ({
        scores: players.map((username, i) => ({
            username: username,
            score: playerScores[i],
        }))
    })

    let playerOptions = props.players.map(p => ({
        key: p.username,
        text: p.displayName,
        value: p.username,
    }))

    const setPlayer = (index: number, newUsername: string) => {
        let newPlayers = players.map((username, i) => (i === index) ? newUsername : username)

        // if we have a duplicate of the new player elsewhere in the list
        // then replace the duplicates with players from the previous set that are now unused
        let unusedPlayers = players.filter(username => !newPlayers.includes(username))
        let deduplicatedPlayers = replaceDuplicates(newPlayers, index, unusedPlayers)

        setPlayers(deduplicatedPlayers)
    }

    const setPlayerScore = (index: number, newScore: number) => {
        setPlayerScores(playerScores.map((score, i) => (i === index) ? newScore : score))
    }

    const canAddPlayer = () => players.length < Math.min(props.players.length, props.maxPlayerCount)

    const addPlayer = () => {
        let nextPlayer = props.players.find(p => !players.includes(p.username))?.username ?? ""
        setPlayers([...players, nextPlayer])
        setPlayerScores([...playerScores, 0])
    }

    const removePlayer = (index: number) => {
        let newPlayers = [...players]
        newPlayers.splice(index, 1)
        setPlayers(newPlayers)

        let newPlayerScores = [...playerScores]
        newPlayerScores.splice(index, 1)
        setPlayerScores(newPlayerScores)
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
                    <span>Submit&nbsp;</span>
                    <Icon name="check" />
                </Button>
            </Button.Group>

            {props.players.length < props.maxPlayerCount && <PlayerCountWarning
                playerCount={props.players.length}
                maxPlayerCount={props.maxPlayerCount} />}

            <Form>
                {players.map((username, i) => (
                    <div key={i} className="player-score-input-removable">
                        <PlayerScoreInput
                            key={i}
                            label={`Player ${i + 1}`}
                            playerOptions={playerOptions}
                            player={username}
                            setPlayer={username => setPlayer(i, username)}
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
        </div>
    )
}
