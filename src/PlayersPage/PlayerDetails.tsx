import { useState } from "react"
import { Button, Header, Icon, Modal } from "semantic-ui-react"

import { Player } from "../models/Player"

interface PlayerDetailsProps {
    player: Player
    onDeletedPlayer: () => void
}

export const PlayerDetails = (props: PlayerDetailsProps) => {
    const [showDeletePrompt, setShowDeletePrompt] = useState(false)

    let player = props.player

    const deletePlayer = () => {
        fetch(`http://localhost:8000/players/${player.username}`, {
            method: "DELETE"
        })
            .then(props.onDeletedPlayer)
    }

    const renderDeletePrompt = () => (
        <Modal
            onClose={() => setShowDeletePrompt(false)}
            open={showDeletePrompt}
            size="mini">
            <Header icon>
                <Icon name="warning" />
                Delete Player
            </Header>
            <Modal.Content>
                <p>
                    Are you sure you want to delete {player?.displayName ?? "<player>"}?
                    This will also delete all their results!
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button color="green" onClick={deletePlayer}>
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
        <div className="player-details">
            {renderDeletePrompt()}

            <h3>{player?.displayName}</h3>

            <Button
                icon
                fluid
                color="red"
                onClick={() => setShowDeletePrompt(true)}>
                <span>Delete Player&nbsp;</span>
                <Icon name="remove" />
            </Button>
        </div>
    )
}
