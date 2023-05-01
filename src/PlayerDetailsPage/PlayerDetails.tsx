import { useMutation, useQueryClient } from "@tanstack/react-query"
import moment from "moment"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Button, Header, Icon, Modal } from "semantic-ui-react"

import { PlayerImage } from "../PlayerImage"

import { parseToken } from "../Auth"
import { deletePlayer } from "../FetchHelpers"
import { resetTitle, setTitle } from "../Helpers"
import { displayDateValue } from "../MomentHelpers"

import { Player } from "../models/Player"

interface PlayerDetailsProps {
    player: Player
}

export const PlayerDetails = (props: PlayerDetailsProps) => {
    const navigate = useNavigate()

    let queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: (player: Player) => deletePlayer(player.username),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["players"],
            })

            setShowDeletePrompt(false)

            navigate("/")
        }
    })

    const [showDeletePrompt, setShowDeletePrompt] = useState(false)

    const token = parseToken()

    let player = props.player

    useEffect(() => {
        if (player?.displayName) {
            setTitle("BoreScore - " + player.displayName)
        }
        else {
            resetTitle()
        }
    }, [player])

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
                <Button color="green" onClick={() => mutate(player)}>
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

    return (
        <div className="player-details">
            {token && renderDeletePrompt(player)}

            <div className="content">
                <div className="left">
                    <PlayerImage imageSrc={player.profilePicture} />

                    {token && <Button
                        icon
                        fluid
                        color="red"
                        onClick={() => setShowDeletePrompt(true)}>
                        <span>Delete Player&nbsp;</span>
                        <Icon name="remove" />
                    </Button>}
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
