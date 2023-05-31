import { useMutation, useQueryClient } from "@tanstack/react-query"
import moment from "moment"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Button, Form, Header, Icon, Input, Modal } from "semantic-ui-react"
import { v4 as newGuid } from "uuid"

import { LinkForm } from "./LinkForm"
import { ImagePreview } from "../ImagePreview/ImagePreview"

import { postGame } from "../FetchHelpers"
import { useGames, useLinkTypes, useWinMethods } from "../QueryHelpers"

import { Link, Game } from "../models/Game"
import { WinMethodName } from "../models/WinMethod"

import "./AddGameModal.css"

interface AddGameModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    game?: string
    group?: string
}

export const AddGameModal = (props: AddGameModalProps) => {
    const { data: games } = useGames()
    const { data: linkTypes } = useLinkTypes()
    const { data: winMethods } = useWinMethods()

    const queryClient = useQueryClient()

    const { mutate: addGame } = useMutation({
        mutationFn: postGame,
        onSuccess: (data: Game) => {
            queryClient.invalidateQueries({
                queryKey: ["games"]
            })

            navigate(`/games/${data.id}`)
        },
    })

    const [displayName, setDisplayName] = useState("")
    const [synopsis, setSynopsis] = useState("")
    const [description, setDescription] = useState("")
    const [minPlayers, setMinPlayers] = useState(1)
    const [maxPlayers, setMaxPlayers] = useState(2)
    const [winMethod, setWinMethod] = useState("")
    const [imageLink, setImageLink] = useState("")
    const [links, setLinks] = useState<Link[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        if (winMethods && winMethods.length > 0) {
            setWinMethod(winMethods[0].name)
        }
    }, [winMethods])

    useEffect(() => {
        setLinks((linkTypes ?? []).map(l => ({
            type: l.name,
            link: "",
        })))
    }, [setLinks, linkTypes])

    const displayNameIsAvailable = () => !(games ?? []).map(g => g.displayName).includes(displayName)

    const formIsComplete = () => {
        return displayName.length > 0
            && displayNameIsAvailable()
            && minPlayers > 0
            && maxPlayers >= minPlayers
            && winMethod.length > 0
    }

    // TODO: handle errors, e.g. game already exists
    const submit = () => addGame({
        id: newGuid(),
        timeCreated: moment().unix(),
        displayName: displayName,
        synopsis: synopsis,
        description: description,
        minPlayers: minPlayers,
        maxPlayers: maxPlayers,
        winMethod: winMethod as WinMethodName,
        imageLink: imageLink,
        links: links,
    })

    const createWinMethodOptions = () => (winMethods ?? []).map(w => ({
        key: w.name,
        text: w.displayName,
        value: w.name
    }))

    return (
        <Modal
            className="add-game-modal"
            onClose={() => props.setOpen(false)}
            open={props.open}>
            <Header>
                <Icon name="game" />
                Add Game
            </Header>
            <Modal.Content>
                <div className="add-game-form">
                    <Form>
                        <Form.Input
                            error={!displayNameIsAvailable()}
                            label="Display Name"
                            placeholder="Display Name"
                            value={displayName}
                            onChange={(e, { value }) => setDisplayName(value)} />

                        <Form.Input
                            label="Synopsis"
                            placeholder="Synopsis"
                            value={synopsis}
                            onChange={(e, { value }) => setSynopsis(value)} />

                        <Form.Group widths="equal">
                            <Form.Input
                                type="number"
                                label="Minimum Players"
                                value={minPlayers}
                                min={1}
                                onChange={(e, { value }) => setMinPlayers(Number(value))} />

                            <Form.Input
                                type="number"
                                label="Maximum Players"
                                value={maxPlayers}
                                min={minPlayers}
                                onChange={(e, { value }) => setMaxPlayers(Number(value))} />

                            <Form.Dropdown
                                selection
                                label="Win Method"
                                options={createWinMethodOptions()}
                                value={winMethod}
                                onChange={(e, { value }) => setWinMethod(String(value))} />
                        </Form.Group>
                    </Form>

                    <div style={{ display: "flex", }}>
                        <div style={{ flexGrow: 1, }}>
                            <Input
                                fluid
                                label={{ color: "blue", content: "Image" }}
                                placeholder="URL"
                                value={imageLink}
                                onChange={(e, { value }) => setImageLink(value)} />

                            <LinkForm
                                linkTypes={linkTypes ?? []}
                                links={links}
                                setLinks={setLinks} />
                        </div>

                        <div style={{ marginLeft: "0.5rem", }}>
                            <ImagePreview imageLink={imageLink} />
                        </div>
                    </div>


                    <Form>
                        <Form.TextArea
                            label="Description"
                            placeholder="Description"
                            value={description}
                            onChange={(e, { value }) => setDescription(String(value))} />
                    </Form>
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
