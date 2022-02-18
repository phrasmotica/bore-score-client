import moment from "moment"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Button, Icon, Table } from "semantic-ui-react"

import { displayDateValue } from "../MomentHelpers"

import { Game } from "../models/Game"

interface GameDetailsProps {
    game: Game
    onDeletedGame: () => void
}

export const GameDetails = (props: GameDetailsProps) => {
    const [showDetails, setShowDetails] = useState(false)

    let navigate = useNavigate()

    let game = props.game

    const submitResult = () => navigate(`/add-result?gameId=${game.id}`)

    const deleteGame = () => {
        fetch(`http://localhost:8000/games/${game.id}`, {
            method: "DELETE"
        })
            .then(props.onDeletedGame)
    }

    let playersStr = `${game.minPlayers}-${game.maxPlayers}`
    if (game.minPlayers === game.maxPlayers) {
        playersStr = game.minPlayers.toString()
    }

    return (
        <div className="game-details">
            <h3>{game.name}</h3>

            {game.synopsis.length > 0 && <h5 className="game-synopsis">
                {game.synopsis}
            </h5>}

            <div className="action-buttons">
                <Button.Group widths={2}>
                    <Button
                        icon
                        color="teal"
                        onClick={submitResult}>
                        <span>Submit Result&nbsp;</span>
                        <Icon name="check" />
                    </Button>

                    <Button
                        icon
                        color="red"
                        onClick={deleteGame}>
                        <span>Delete Game&nbsp;</span>
                        <Icon name="remove" />
                    </Button>
                </Button.Group>
            </div>

            <div className="show-details-button">
                <Button
                    fluid
                    color="blue"
                    onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? "Hide Details" : "Show Details"}
                </Button>
            </div>

            <div className="game-details-container">
                {showDetails && game.description.length > 0 && <p className="description">
                    {game.description}
                </p>}

                {showDetails && <p className="time-created">
                    <em>Added: {displayDateValue(moment.unix(game.timeCreated))}</em>
                </p>}

                {showDetails && <Table celled color="blue">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Players</Table.HeaderCell>
                            <Table.HeaderCell>Win Method</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>{playersStr}</Table.Cell>
                            <Table.Cell>{game.winMethod}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>}
            </div>
        </div>
    )
}
