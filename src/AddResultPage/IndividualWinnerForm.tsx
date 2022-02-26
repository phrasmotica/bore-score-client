import { useEffect, useState } from "react"
import { Button, Form, Icon, Table } from "semantic-ui-react"

import { PlayerCountWarning } from "./PlayerCountWarning"
import { PlayerDropdown } from "./PlayerDropdown"
import { RemovePlayerButton } from "./RemovePlayerButton"

import { getPlayersToUse, replaceDuplicates } from "../Helpers"

import { Player } from "../models/Player"

interface IndividualWinnerFormProps {
    players: Player[]
    minPlayerCount: number
    maxPlayerCount: number
    submit: (formData: any) => void
}

export const IndividualWinnerForm = (props: IndividualWinnerFormProps) => {
    const [players, setPlayers] = useState<string[]>([])
    const [winnerIndex, setWinnerIndex] = useState(0)

    useEffect(() => {
        // fill current player inputs with first N (<= minPlayerCount) players
        let playersToUse = getPlayersToUse(props.players.map(p => p.username), props.minPlayerCount)
        setPlayers(playersToUse)
    }, [props.players, props.minPlayerCount])

    const formIsComplete = () => players.length > 0 && new Set(players).size === players.length

    const getFormData = () => ({
        scores: players.map((username, i) => ({
            username: username,
            isWinner: i === winnerIndex,
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

            <Table color="yellow">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Player</Table.HeaderCell>
                        <Table.HeaderCell>Winner</Table.HeaderCell>
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
                                <Form.Checkbox
                                    radio
                                    checked={i === winnerIndex}
                                    onChange={() => setWinnerIndex(i)} />
                            </Table.Cell>

                            <Table.Cell>
                                <RemovePlayerButton
                                    removePlayer={() => removePlayer(i)}
                                    isDisabled={i < props.minPlayerCount} />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}
