import moment from "moment"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Button, Form, Header, Icon, Input, Label, Message, Modal } from "semantic-ui-react"
import { v4 as newGuid } from "uuid"

import { getHeaders } from "../Auth"
import { computeName } from "../Helpers"
import { ImagePreview } from "../ImagePreview/ImagePreview"
import { useGroups } from "../QueryHelpers"

import { Group, GroupVisibilityName } from "../models/Group"

import "./AddGroupModal.css"

interface AddGroupModalProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export const AddGroupModal = (props: AddGroupModalProps) => {
    const { data: groups } = useGroups()

    const [name, setName] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [description, setDescription] = useState("")
    const [visibility, setVisibility] = useState(GroupVisibilityName.Public)
    const [profilePicture, setProfilePicture] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        setName(displayName.length > 0 ? computeName(displayName): "")
    }, [displayName])

    const nameIsAvailable = () => !groups || !groups.map(p => p.name).includes(name)

    const formIsComplete = () => name.length > 0 && nameIsAvailable() && displayName.length > 0

    const newGroup = {
        id: newGuid(),
        timeCreated: moment().unix(),
        name: name,
        displayName: displayName,
        description: description,
        profilePicture: profilePicture,
        visibility: visibility,
    } as Group

    // TODO: handle errors, e.g. group already exists
    const submit = () => {
        const headers = getHeaders()
        headers.set("Content-Type", "application/json")

        fetch(`${process.env.REACT_APP_API_URL}/groups`, {
            method: "POST",
            body: JSON.stringify(newGroup),
            headers: headers,
        })
        .then(res => res.json())
        .then((newGroup: Group) => navigate(`/groups/${newGroup.name}`))
    }

    return (
        <Modal
            className="add-group-modal"
            onClose={() => props.setOpen(false)}
            open={props.open}>
            <Header>
                <Icon name="group" />
                Add Group
            </Header>
            <Modal.Content>
                <div className="add-group-form">
                    <div className="add-group-form-inputs">
                        <div className="add-group-form-fields">
                            <Input
                                fluid
                                label="Display Name"
                                placeholder="Display Name"
                                value={displayName}
                                onChange={(e, { value }) => setDisplayName(value)} />

                            <Input
                                fluid
                                error={!nameIsAvailable()}
                                label="Name"
                                placeholder="Name"
                                value={name}
                                onChange={(e, { value }) => setName(value)} />

                            <Form>
                                <div className="labelled-input">
                                    <Label>Description</Label>

                                    <Form.TextArea
                                        className="description-text"
                                        placeholder="Description"
                                        value={description}
                                        onChange={(e, { value }) => setDescription(value as string)} />
                                </div>
                            </Form>

                            <Input
                                fluid
                                label="Profile Picture"
                                placeholder="URL"
                                value={profilePicture}
                                onChange={(e, { value }) => setProfilePicture(value)} />

                            <div className="labelled-input">
                                <Label>Visibility</Label>

                                <Button.Group>
                                    <Button
                                        positive={visibility === GroupVisibilityName.Public}
                                        onClick={() => setVisibility(GroupVisibilityName.Public)}>
                                        Public
                                    </Button>

                                    <Button.Or />

                                    <Button
                                        positive={visibility === GroupVisibilityName.Private}
                                        onClick={() => setVisibility(GroupVisibilityName.Private)}>
                                        Private
                                    </Button>
                                </Button.Group>
                            </div>

                            {visibility === GroupVisibilityName.Public && <PublicGroupMessage />}
                            {visibility === GroupVisibilityName.Private && <PrivateGroupMessage />}
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

const PublicGroupMessage = () => <Message info>Anyone can join a public group.</Message>
const PrivateGroupMessage = () => <Message info>Users must be invited to a private group by an existing member.</Message>
