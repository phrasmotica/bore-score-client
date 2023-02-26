import { useState } from "react"
import { useNavigate } from "react-router"
import { Button, Dimmer, Header, Icon, Input, Loader, Message, Modal } from "semantic-ui-react"

import { handleResponse } from "../Helpers"
import { ImagePreview } from "../ImagePreview/ImagePreview"

import { Player } from "../models/Player"

import "./AddPlayerModal.css"

interface AddPlayerModalProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export const AddPlayerModal = (props: AddPlayerModalProps) => {
    const [username, setUsername] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [profilePicture, setProfilePicture] = useState("")

    const [posting, setPosting] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    const formIsComplete = () => username.length > 0 && displayName.length > 0

    // TODO: handle errors, e.g. player already exists
    const submit = () => {
        setPosting(true)
        setErrorMessage("")

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
        .then(handleResponse)
        .then(res => res.json())
        .then((newPlayer: Player) => navigate(`/players/${newPlayer.username}`))
        .catch((err: Error) => setErrorMessage(err.message))
        .finally(() => setPosting(false))
    }

    return (
        <Modal
            className="add-player-modal"
            onClose={() => props.setOpen(false)}
            open={props.open}>
            <Header>
                <Icon name="user" />
                Add Player
            </Header>
            <Modal.Content>
                <Dimmer active={posting}><Loader /></Dimmer>

                <div className="add-player-form">
                    <div className="add-player-form-inputs">
                        <div className="add-player-form-fields">
                            <Input
                                fluid
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

                            {errorMessage && <Message error>{errorMessage}</Message>}
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
