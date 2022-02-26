import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Icon, Input } from "semantic-ui-react"

import { LinkForm } from "./LinkForm"

import { fetchGames, fetchWinMethods } from "../FetchHelpers"
import { GamesList } from "../GamesList"

import { Game, Link } from "../models/Game"
import { WinMethod } from "../models/WinMethod"

export const AddGamePage = () => {
    const [games, setGames] = useState<Game[]>([])
    const [winMethods, setWinMethods] = useState<WinMethod[]>([])

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
        fetchGames()
            .then(setGames)

        fetchWinMethods()
            .then(setWinMethods)
    }, [])

    useEffect(() => {
        if (winMethods.length > 0) {
            setWinMethod(winMethods[0].name)
        }
    }, [winMethods])

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
            .then(newGame => navigate(`/games?game=${newGame.name}`))
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
