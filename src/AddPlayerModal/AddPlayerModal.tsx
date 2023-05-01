import { useMutation, useQueryClient } from "@tanstack/react-query"
import moment from "moment"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Button, Dimmer, Header, Icon, Input, Loader, Message, Modal } from "semantic-ui-react"
import { v4 as newGuid } from "uuid"

import { postPlayer } from "../FetchHelpers"

import { ImagePreview } from "../ImagePreview/ImagePreview"

import "./AddPlayerModal.css"

interface AddPlayerModalProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export const AddPlayerModal = (props: AddPlayerModalProps) => {
    const navigate = useNavigate()

    const queryClient = useQueryClient()

    // TODO: handle errors, e.g. player already exists
    const { isLoading: posting, mutate: addPlayer } = useMutation({
        mutationFn: postPlayer,
        onMutate: () => setErrorMessage(""),
        onSuccess: data => {
            queryClient.invalidateQueries({
                queryKey: ["players"],
            })

            navigate(`/players/${data.username}`)
        },
        onError: (error: Error) => setErrorMessage(error.message),
    })

    const [username, setUsername] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [profilePicture, setProfilePicture] = useState("")

    const [errorMessage, setErrorMessage] = useState("")

    const formIsComplete = () => username.length > 0 && displayName.length > 0

    const submit = () => addPlayer({
        id: newGuid(),
        timeCreated: moment().unix(),
        username: username,
        displayName: displayName,
        profilePicture: profilePicture,
    })

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
