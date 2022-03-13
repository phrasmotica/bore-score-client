import moment from "moment"
import { useState } from "react"
import { Button, Header, Icon, Modal } from "semantic-ui-react"

import { PlayerImage } from "../PlayerImage"

import { displayDateValue } from "../MomentHelpers"

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

    const renderDeletePrompt = (player: Player) => (
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
                    Are you sure you want to delete {player.displayName}?
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

    if (player === undefined) {
        return null
    }

    let imageSrc = "https://e.snmc.io/i/600/s/9f6d3d17acac6ce20993eb158c203e4b/5662600/godspeed-you-black-emperor-lift-yr-skinny-fists-like-antennas-to-heaven-cover-art.jpg"

    return (
        <div className="player-details">
            {renderDeletePrompt(player)}

            <div className="content">
                <div className="left">
                    <PlayerImage imageSrc={imageSrc} />

                    <Button
                        icon
                        fluid
                        color="red"
                        onClick={() => setShowDeletePrompt(true)}>
                        <span>Delete Player&nbsp;</span>
                        <Icon name="remove" />
                    </Button>
                </div>

                <div>
                    <h3 className="display-name-header">
                        {player.displayName}
                    </h3>

                    <p className="username">
                        {player.username}
                    </p>

                    <p className="time-created">
                        <em>Active since {displayDateValue(moment.unix(player.timeCreated))}</em>
                    </p>
                </div>
            </div>
        </div>
    )
}
