import { useState } from "react"
import { useNavigate } from "react-router"
import { Button, Icon, Table } from "semantic-ui-react"

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

    return (
        <div className="game-details">
            <h3>{game.name}</h3>

            <h5 className="game-synopsis">
                {game.synopsis}
            </h5>

            <Button
                fluid
                color="blue"
                onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? "Hide Details" : "Show Details"}
            </Button>

            <div className="game-details-container">
                {showDetails && <p className="description">
                    {game.description}
                </p>}

                {showDetails && <Table celled color="teal">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Players</Table.HeaderCell>
                            <Table.HeaderCell>Win Method</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>{game.minPlayers}-{game.maxPlayers}</Table.Cell>
                            <Table.Cell>{game.winMethod}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>}
            </div>

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
    )
}
