import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Icon, Input } from "semantic-ui-react"

import { LinkForm } from "./LinkForm"
import { GamesList } from "../GamesList"

import { useComputedName, useGames, useLinkTypes, useWinMethods } from "../FetchHelpers"
import { useTitle } from "../Hooks"

import { Game, Link } from "../models/Game"

export const AddGamePage = () => {
    useTitle("Add Game")

    const { games } = useGames()
    const { linkTypes } = useLinkTypes()
    const { winMethods } = useWinMethods()

    const [displayName, setDisplayName] = useState("")
    const [synopsis, setSynopsis] = useState("")
    const [description, setDescription] = useState("")
    const [minPlayers, setMinPlayers] = useState(1)
    const [maxPlayers, setMaxPlayers] = useState(2)
    const [winMethod, setWinMethod] = useState("")
    const [imageLink, setImageLink] = useState("")
    const [links, setLinks] = useState<Link[]>([])

    const { computedName, setComputedName } = useComputedName(displayName, 1000)

    const navigate = useNavigate()

    useEffect(() => {
        if (displayName.length <= 0) {
            setComputedName({
                displayName: "",
                name: "",
            })
        }
    }, [displayName, setComputedName])

    useEffect(() => {
        if (winMethods.length > 0) {
            setWinMethod(winMethods[0].name)
        }
    }, [winMethods])

    useEffect(() => {
        setLinks(linkTypes.map(l => ({
            type: l.name,
            link: "",
        })))
    }, [setLinks, linkTypes])

    const displayNameIsAvailable = () => !games.map(g => g.displayName).includes(displayName)

    const formIsComplete = () => {
        return displayName.length > 0
            && displayNameIsAvailable()
            && minPlayers > 0
            && maxPlayers >= minPlayers
            && winMethod.length > 0
    }

    const submit = () => {
        fetch("http://localhost:8000/games", {
            method: "POST",
            body: JSON.stringify({
                displayName: displayName,
                synopsis: synopsis,
                description: description,
                minPlayers: minPlayers,
                maxPlayers: maxPlayers,
                winMethod: winMethod,
                imageLink: imageLink,
                links: links
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then((newGame: Game) => newGame)
            .then(newGame => navigate(`/games/${newGame.name}`))
    }

    const createWinMethodOptions = () => winMethods.map(w => ({
        key: w.name,
        text: w.displayName,
        value: w.name
    }))

    return (
        <div className="add-game-page">
            <h2>Add Game</h2>

            <div className="add-game-page-body">
                <div className="sidebar">
                    <GamesList games={games} />
                </div>

                <div className="add-game-page-form">
                    <Form>
                        <Form.Input
                            error={!displayNameIsAvailable()}
                            label="Display name"
                            placeholder="Display name"
                            value={displayName}
                            onChange={(e, { value }) => setDisplayName(value)} />

                        <div className="game-name-info">
                            <p>Will be saved as: {computedName?.name ?? ""}</p>
                        </div>

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

                    <div className="image-link">
                        <Input
                            fluid
                            label={{ color: "blue", content: "Image" }}
                            placeholder="URL"
                            value={imageLink}
                            onChange={(e, { value }) => setImageLink(value)} />
                    </div>

                    <LinkForm
                        linkTypes={linkTypes}
                        links={links}
                        setLinks={setLinks} />

                    <Form onSubmit={submit}>
                        <Form.TextArea
                            label="Description"
                            placeholder="Description"
                            value={description}
                            onChange={(e, { value }) => setDescription(String(value))} />

                        <Form.Button
                            icon
                            fluid
                            color="teal"
                            disabled={!formIsComplete()}>
                            <span>Add Game&nbsp;</span>
                            <Icon name="check" />
                        </Form.Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
