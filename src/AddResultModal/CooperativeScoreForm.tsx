import { useCallback, useEffect, useState } from "react"
import { Button, Icon, Table } from "semantic-ui-react"

import { PlayerCountWarning } from "./PlayerCountWarning"
import { PlayerDropdown } from "./PlayerDropdown"
import { ScoreInput } from "./ScoreInput"
import { RemovePlayerButton } from "../AddResultModal/RemovePlayerButton"

import { getPlayersToUse, replaceDuplicates } from "../Helpers"

import { Player } from "../models/Player"

interface CooperativeScoreFormProps {
    players: Player[]
    minPlayerCount: number
    maxPlayerCount: number
    updateFormData: (isComplete: boolean, formData: any) => void
}

export const CooperativeScoreForm = (props: CooperativeScoreFormProps) => {
    const [players, setPlayers] = useState<string[]>([])
    const [score, setScore] = useState(0)

    useEffect(() => {
        // fill current player inputs with first N (<= minPlayerCount) players
        let playersToUse = getPlayersToUse(props.players.map(p => p.username), props.minPlayerCount)
        setPlayers(playersToUse)
    }, [props.players, props.minPlayerCount])

    const formIsComplete = useCallback(() => players.length > 0 && new Set(players).size === players.length, [players])

    const getFormData = useCallback(() => ({
        cooperativeScore: score,
        scores: players.map(username => ({
            username: username,
        }))
    }), [players, score])

    useEffect(() => {
        props.updateFormData(formIsComplete(), getFormData())
    }, [formIsComplete, getFormData, players, score])

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

    const canAddPlayer = () => players.length < Math.min(props.players.length, props.maxPlayerCount)

    const addPlayer = () => {
        let nextPlayer = props.players.find(p => !players.includes(p.username))?.username ?? ""
        setPlayers([...players, nextPlayer])
    }

    const removePlayer = (index: number) => {
        let newPlayers = [...players]
        newPlayers.splice(index, 1)
        setPlayers(newPlayers)
    }

    return (
        <div>
            {props.players.length < props.maxPlayerCount && <PlayerCountWarning
                playerCount={props.players.length}
                maxPlayerCount={props.maxPlayerCount} />}

            <Table color="yellow">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={8}>Player</Table.HeaderCell>
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

                            {i === 0 && <Table.Cell
                                className="cooperative-score-input"
                                rowSpan={players.length}>
                                <ScoreInput
                                    score={score}
                                    setScore={setScore} />
                            </Table.Cell>}

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
