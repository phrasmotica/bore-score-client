import moment from "moment"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Button, Header, Icon, Modal, Table } from "semantic-ui-react"

import { displayDateValue } from "../MomentHelpers"

import { Game } from "../models/Game"
import { WinMethod } from "../models/WinMethod"

interface GameDetailsProps {
    game: Game
    winMethod: WinMethod
    onDeletedGame: () => void
}

export const GameDetails = (props: GameDetailsProps) => {
    const [showDetails, setShowDetails] = useState(false)
    const [showDeletePrompt, setShowDeletePrompt] = useState(false)

    let navigate = useNavigate()

    let game = props.game

    const submitResult = () => navigate(`/add-result?game=${game.name}`)

    const deleteGame = () => {
        fetch(`http://localhost:8000/games/${game.name}`, {
            method: "DELETE"
        })
            .then(props.onDeletedGame)
            .then(() => setShowDeletePrompt(false))
    }

    let playersStr = `${game.minPlayers}-${game.maxPlayers}`
    if (game.minPlayers === game.maxPlayers) {
        playersStr = game.minPlayers.toString()
    }

    const renderDeletePrompt = () => (
        <Modal
            onClose={() => setShowDeletePrompt(false)}
            open={showDeletePrompt}
            size="mini">
            <Header icon>
                <Icon name="warning" />
                Delete Game
            </Header>
            <Modal.Content>
                <p>
                    Are you sure you want to delete {game.displayName}?
                    This will also delete all results for {game.displayName}!
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button color="green" onClick={deleteGame}>
                    <Icon name="checkmark" />
                    Yes
                </Button>

                <Button color="red" onClick={() => setShowDeletePrompt(false)}>
                    <Icon name="remove" />
                    No
                </Button>
            </Modal.Actions>
        </Modal>
    )

    return (
        <div className="game-details">
            {renderDeletePrompt()}

            <h3>{game.displayName}</h3>

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
                        <Icon name="edit" />
                    </Button>

                    <Button
                        icon
                        color="red"
                        onClick={() => setShowDeletePrompt(true)}>
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
                            <Table.Cell>{props.winMethod.displayName}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>}
            </div>
        </div>
    )
}
