import { useCallback, useEffect, useState } from "react"
import { Button, Icon, Table } from "semantic-ui-react"

import { PlayerCountWarning } from "./PlayerCountWarning"
import { PlayerDropdown } from "./PlayerDropdown"
import { ScoreInput } from "./ScoreInput"
import { RemovePlayerButton } from "../AddResultModal/RemovePlayerButton"

import { getPlayersToUse, replaceDuplicates } from "../Helpers"

import { Player } from "../models/Player"

interface IndividualScoreFormProps {
    players: Player[]
    minPlayerCount: number
    maxPlayerCount: number
    updateFormData: (isComplete: boolean, formData: any) => void
}

export const IndividualScoreForm = (props: IndividualScoreFormProps) => {
    const [players, setPlayers] = useState<string[]>([])
    const [playerScores, setPlayerScores] = useState<number[]>([])

    useEffect(() => {
        // fill current player inputs with first N (<= minPlayerCount) players
        let playersToUse = getPlayersToUse(props.players.map(p => p.username), props.minPlayerCount)

        setPlayers(playersToUse)
        setPlayerScores(playersToUse.map(_ => 0))
    }, [props.players, props.minPlayerCount])

    const formIsComplete = useCallback(() => players.length > 0 && new Set(players).size === players.length, [players])

    const getFormData = useCallback(() => ({
        scores: players.map((username, i) => ({
            username: username,
            score: playerScores[i],
        }))
    }), [players, playerScores])

    // including props or props.updateFormData as a dependency here
    // causes the scores to not change, so we omit them for now
    useEffect(() => {
        props.updateFormData(formIsComplete(), getFormData())
    }, [formIsComplete, getFormData, players, playerScores])

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
            {props.players.length < props.maxPlayerCount && !canAddPlayer() && <PlayerCountWarning
                playerCount={props.players.length}
                maxPlayerCount={props.maxPlayerCount} />}

            <Table color="yellow">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={8}>Name</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Score</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {players.map((username, i) => (
                        <Table.Row key={username}>
                            <Table.Cell>
                                <PlayerDropdown
                                    placeholder={`Player ${i + 1}`}
                                    options={playerOptions}
                                    player={username}
                                    setPlayer={player => setPlayer(i, player)} />
                            </Table.Cell>

                            <Table.Cell>
                                <ScoreInput
                                    score={playerScores[i]}
                                    setScore={s => setPlayerScore(i, s)} />
                            </Table.Cell>

                            <Table.Cell style={{ width: "0.1%" }}>
                                <RemovePlayerButton
                                    removePlayer={() => removePlayer(i)}
                                    isDisabled={players.length <= props.minPlayerCount} />
                            </Table.Cell>
                        </Table.Row>
                    ))}

                    {canAddPlayer() && <Table.Row>
                        <Table.Cell colSpan={3}>
                            <Button
                                icon
                                fluid
                                className="add-player-button"
                                color="yellow"
                                onClick={addPlayer}>
                                <span>Add Player&nbsp;</span>
                                <Icon name="add user" />
                            </Button>
                        </Table.Cell>
                    </Table.Row>}
                </Table.Body>
            </Table>
        </div>
    )
}
