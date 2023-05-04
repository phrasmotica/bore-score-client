import { useMutation, useQueryClient } from "@tanstack/react-query"
import moment from "moment"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Button, Form, Header, Icon, Input, Label, Message, Modal } from "semantic-ui-react"
import { v4 as newGuid } from "uuid"

import { postGroup } from "../FetchHelpers"
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
    const navigate = useNavigate()

    const { data: groups } = useGroups()

    const queryClient = useQueryClient()

    const { mutate: addGroup } = useMutation({
        mutationFn: postGroup,
        onSuccess: (data: Group) => {
            queryClient.invalidateQueries({
                queryKey: ["groups"]
            })

            navigate(`/groups/${data.name}`)
        },
    })

    const [name, setName] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [description, setDescription] = useState("")
    const [visibility, setVisibility] = useState(GroupVisibilityName.Public)
    const [profilePicture, setProfilePicture] = useState("")

    useEffect(() => {
        setName(computeName(displayName))
    }, [displayName])

    // TODO: append "-1" if name is not available on submitting
    const nameIsAvailable = () => !groups || !groups.map(p => p.name).includes(name)

    const formIsComplete = () => name.length > 0 && nameIsAvailable() && displayName.length > 0

    const submit = () => addGroup({
        id: newGuid(),
        timeCreated: moment().unix(),
        name: name,
        displayName: displayName,
        description: description,
        profilePicture: profilePicture,
        visibility: visibility,
        createdBy: "",
    })

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
