import { useState } from "react"
import { useNavigate } from "react-router"
import { Button, Header, Icon, Input, Modal } from "semantic-ui-react"

import { usePlayers } from "../FetchHelpers"
import { ImagePreview } from "../ImagePreview/ImagePreview"

import { Player } from "../models/Player"

import "./AddPlayerModal.css"

interface AddPlayerModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    game?: string
    group?: string
}

export const AddPlayerModal = (props: AddPlayerModalProps) => {
    const { players } = usePlayers()

    const [username, setUsername] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [profilePicture, setProfilePicture] = useState("")

    const navigate = useNavigate()

    const usernameIsAvailable = () => !players.map(p => p.username).includes(username)

    const formIsComplete = () => username.length > 0 && usernameIsAvailable() && displayName.length > 0

    const submit = () => {
        fetch(`${process.env.REACT_APP_API_URL}/players`, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                displayName: displayName,
                profilePicture: profilePicture,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then((newPlayer: Player) => navigate(`/players/${newPlayer.username}`))
    }

    return (
        <Modal
            className="add-player-modal"
            onClose={() => props.setOpen(false)}
            open={props.open}>
            <Header>
                <Icon name="add user" />
                Add Player
            </Header>
            <Modal.Content>
                <div className="add-player-form">
                    <div className="add-player-form-inputs">
                        <div className="add-player-form-fields">
                            <Input
                                fluid
                                error={!usernameIsAvailable()}
                                label="Username"
                                placeholder="Username"
                                value={username}
                                onChange={(e, { value }) => setUsername(value)} />

                            <Input
                                fluid
                                label="Display name"
                                placeholder="Display name"
                                value={displayName}
                                onChange={(e, { value }) => setDisplayName(value)} />

                            <Input
                                fluid
                                label={{ color: "blue", content: "Profile Picture" }}
                                placeholder="URL"
                                value={profilePicture}
                                onChange={(e, { value }) => setProfilePicture(value)} />
                        </div>

                        <ImagePreview imageLink={profilePicture} />
                    </div>
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color="green"
                    disabled={!formIsComplete()}
                    onClick={submit}>
                    <Icon name="checkmark" />
                    Submit
                </Button>

                <Button color="red" onClick={() => props.setOpen(false)}>
                    <Icon name="remove" />
                    Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
